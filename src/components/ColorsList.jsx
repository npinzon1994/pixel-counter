import ColorsContext from "../context/colors-context";
import KDTree from "../model/kd-tree";
import classes from "./ColorsList.module.css";
import { useContext, useEffect, useState } from "react";

const CONVERSION_MATRIX = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];

const formatWithComma = (number) => Intl.NumberFormat().format(number);

function extractDigits(string) {
  const extractedValues = string.match(/\d+/g).map(Number);
  return {
    r: extractedValues[0],
    g: extractedValues[1],
    b: extractedValues[2],
    a: extractedValues[3],
  };
}

function convertToMatrix(rgbArray) {
  const r = [];
  const g = [];
  const b = [];
  for (let i = 0; i < rgbArray.length; i++) {
    const extractedValues = rgbArray[i][0]
      .match(/\d+/g)
      .map((match) => parseFloat(match));
    if (extractedValues.length === 4) {
      extractedValues.pop(); //remove the A only if it exists
    }
    r.push(extractedValues[0]);
    g.push(extractedValues[1]);
    b.push(extractedValues[2]);
  }
  return [r, g, b];
}

function convertRGBtoXYZ(rgbMatrix) {
  const normalizedValues = rgbMatrix.map((innerArray) =>
    innerArray.map((value) => value / 255)
  );
  const linearizedValues = normalizedValues.map((innerArray) =>
    innerArray.map((value) =>
      value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    )
  );

  // Get dimensions of the matrices
  const rowsA = CONVERSION_MATRIX.length;
  const colsA = CONVERSION_MATRIX[0].length;
  const rowsB = linearizedValues.length;
  const colsB = linearizedValues[0].length;

  // Ensure the number of columns in A matches the number of rows in B
  if (colsA !== rowsB) {
    throw new Error(
      "Matrix multiplication not possible: columns of A must equal rows of B"
    );
  }

  // Initialize the result matrix with zeros (to ensure it isn't sparse)
  const result = Array(rowsA)
    .fill(null)
    .map(() => Array(colsB).fill(0));

  // Perform the matrix multiplication
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        //k keeps track of elements in dot product
        result[i][j] += CONVERSION_MATRIX[i][k] * linearizedValues[k][j];
      }
    }
  }
  return result;
}

function convertXYZtoCIELAB(
  xyzPixel,
  whitePoint = { X: 95.0489, Y: 100.0, Z: 108.884 }
) {
  const { x, y, z } = xyzPixel;

  //D65 reference white point
  const { X: Xn, Y: Yn, Z: Zn } = whitePoint;

  //X, Y, and Z come from matrix we get back from RGBtoXYZ conversion

  //Normalize XYZ by the reference white point
  const Xr = x / Xn;
  const Yr = y / Yn;
  const Zr = z / Zn;

  //define the transformation function f(t)
  const delta = 6 / 29;
  const f = (t) =>
    t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;

  //apply transformation function
  const fX = f(Xr);
  const fY = f(Yr);
  const fZ = f(Zr);

  //calculate CIELAB values
  const L = 116 * fY - 16;
  const a = 500 * (fX - fY);
  const b = 200 * (fY - fZ);

  return { L, a, b };
}

function convertCIELABtoXYZ(
  labPixel,
  whitePoint = { X: 95.047, Y: 100.0, Z: 108.883 }
) {
  const L = labPixel[0];
  const a = labPixel[1];
  const b = labPixel[2];

  const { X: Xn, Y: Yn, Z: Zn } = whitePoint;

  // Reverse f(t) transformation
  const delta = 6 / 29;
  const fInverse = (t) => (t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29));

  // Calculate fX, fY, and fZ
  const fY = (L + 16) / 116;
  const fX = fY + a / 500;
  const fZ = fY - b / 200;

  // Apply fInverse to get normalized Xr, Yr, Zr
  const Xr = fInverse(fX);
  const Yr = fInverse(fY);
  const Zr = fInverse(fZ);

  // Denormalize by multiplying with the reference white point
  const x = Xr * Xn;
  const y = Yr * Yn;
  const z = Zr * Zn;

  return { x, y, z };
}

function convertXYZtoRGB(xyzPixel) {
  const { x, y, z } = xyzPixel;

  // Transformation matrix for converting XYZ to linear RGB (sRGB D65)
  const M = [
    [3.2406, -1.5372, -0.4986],
    [-0.9689, 1.8758, 0.0415],
    [0.0557, -0.204, 1.057],
  ];

  // Convert XYZ to linear RGB
  const rLinear = M[0][0] * x + M[0][1] * y + M[0][2] * z;
  const gLinear = M[1][0] * x + M[1][1] * y + M[1][2] * z;
  const bLinear = M[2][0] * x + M[2][1] * y + M[2][2] * z;

  // Gamma correction function for sRGB
  const gammaCorrect = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

  // Apply gamma correction and clamp values to the [0, 1] range
  const r = Math.min(Math.max(gammaCorrect(rLinear), 0), 1);
  const g = Math.min(Math.max(gammaCorrect(gLinear), 0), 1);
  const b = Math.min(Math.max(gammaCorrect(bLinear), 0), 1);

  // Scale to 8-bit RGB range [0, 255]
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

const ColorsList = () => {
  const { colors } = useContext(ColorsContext);
  const [scrapedColors, setScrapedColors] = useState({});

  //scraping colors on first load
  useEffect(() => {
    fetch("http://localhost:5000/api/colors")
      .then((response) => response.json())
      .then((data) => setScrapedColors(data))
      .catch((error) => console.error("Error fetching colors:", error));
  }, []);

  useEffect(() => {
    console.log("Scraped Colors: ", scrapedColors);
  }, [scrapedColors]);

  //convert to array and filter out transparent pixels
  const rgbArray_fromImg = Object.entries(colors).filter(
    (color) => parseInt(color[0].split("A")[1]) !== 0
  );

  //prepping for matrix transformations
  const rgbMatrix_fromImg = convertToMatrix(rgbArray_fromImg);
  console.log("RGB Matrix from IMAGE:", rgbMatrix_fromImg);

  const rgbMatrix_lookupTable = convertToMatrix(Object.entries(scrapedColors));
  console.log("RGB Matrix from LOOKUP TABLE", rgbMatrix_lookupTable);

  const xyzMatrix_fromImg = convertRGBtoXYZ(rgbMatrix_fromImg);
  console.log("XYZ Matrix from IMAGE: ", xyzMatrix_fromImg);

  const xyzMatrix_lookupTable = convertRGBtoXYZ(rgbMatrix_lookupTable);
  console.log("XYZ Matrix from LOOKUP TABLE: ", xyzMatrix_lookupTable);

  //converting back to n*3 matrix for color comparison
  const labValues_fromImg = [];
  for (let i = 0; i < xyzMatrix_fromImg[0].length; i++) {
    const pixel = [];
    for (let j = 0; j < xyzMatrix_fromImg.length; j++) {
      pixel.push(xyzMatrix_fromImg[j][i]);
    }
    const xyzPixel = {
      x: pixel[0],
      y: pixel[1],
      z: pixel[2],
    };
    const labPixel = Object.values(convertXYZtoCIELAB(xyzPixel));
    labValues_fromImg.push(labPixel);
  }
  console.log("Lab values from IMAGE: ", labValues_fromImg);

  //converting back to n*3 matrix for color comparison
  const labValues_lookupTable = [];
  for (let i = 0; i < xyzMatrix_lookupTable[0].length; i++) {
    const pixel = [];
    for (let j = 0; j < xyzMatrix_lookupTable.length; j++) {
      pixel.push(xyzMatrix_lookupTable[j][i]);
    }
    const xyzPixel = {
      x: pixel[0],
      y: pixel[1],
      z: pixel[2],
    };
    const labPixel = Object.values(convertXYZtoCIELAB(xyzPixel));
    labValues_lookupTable.push(labPixel);
  }
  console.log("Lab values from LOOKUP TABLE: ", labValues_lookupTable);

  const colorLookupTree = new KDTree(labValues_lookupTable);

  const rgbPixels = labValues_fromImg.map((value) => {
    const labPixel = colorLookupTree.findNearestNeighbor(value).point;
    const xyzPixel = convertCIELABtoXYZ(labPixel);
    return convertXYZtoRGB(xyzPixel);
  });

  const colorQuantities = Object.entries(colors).map((color) => color[1]);
  const colorPalette = [];
  let totalPixels = 0;
  for (let i = 0; i < rgbPixels.length; i++) {
    const color = { ...rgbPixels[i] };
    const { r, g, b } = color;
    const colorKey = `R${r}G${g}B${b}`;
    const name = colorKey in scrapedColors ? scrapedColors[colorKey] : colorKey;
    color.colorKey = colorKey;
    color.name = name;
    color.quantity = colorQuantities[i];
    totalPixels += color?.quantity;
    colorPalette.push(color);
  }

  return (
    <>
      <p>TOTAL BEAD COUNT -- {formatWithComma(totalPixels)}</p>
      <ul className={classes.list}>
        {colorPalette.map((color) => (
          <li key={color.colorKey}>
            <div
              className={classes["color-swatch"]}
              style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
            />
            <span>{color.name}</span>
            <span>{formatWithComma(color.quantity)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColorsList;
