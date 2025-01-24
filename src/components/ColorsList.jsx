import ColorsContext from "../context/colors-context";
import classes from "./ColorsList.module.css";
import { useContext, useEffect, useState } from "react";

const CONVERSION_MATRIX = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];

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
    innerArray.map((value) => value ** (1 / 2.2))
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
  whitePoint = { X: 95.047, Y: 100.0, Z: 108.883 }
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

function calculateColorDifference(pixel1, pixel2) {
  const deltaL = (pixel2.L - pixel1.L) ** 2;
  const deltaA = (pixel2.a - pixel1.a) ** 2;
  const deltaB = (pixel2.b - pixel1.b) ** 2;
  return Math.sqrt(deltaL + deltaA + deltaB);
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

  // useEffect(() => {
  //   console.log("Scraped Colors: ", scrapedColors);
  // }, [scrapedColors]);

  //convert to array and filter out transparent pixels
  const rgbArray_fromImg = Object.entries(colors).filter(
    (color) => parseInt(color[0].split("A")[1]) !== 0
  );

  const rgbMatrix_fromImg = convertToMatrix(rgbArray_fromImg);
  console.log("RGB Matrix from IMAGE:", rgbMatrix_fromImg);

  const rgbMatrix_lookupTable = convertToMatrix(Object.entries(scrapedColors));
  console.log("RGB Matrix from LOOKUP TABLE", rgbMatrix_lookupTable);

  const xyzMatrix_fromImg = convertRGBtoXYZ(rgbMatrix_fromImg);
  console.log("XYZ Matrix from IMAGE: ", xyzMatrix_fromImg);

  const xyzMatrix_lookupTable = convertRGBtoXYZ(rgbMatrix_lookupTable);
  console.log("XYZ Matrix from LOOKUP TABLE: ", xyzMatrix_lookupTable);

  //need to get xyz values into object form for lab conversion
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

    const labPixel = convertXYZtoCIELAB(xyzPixel);
    labValues_fromImg.push(labPixel);
  }

  console.log("Lab values from IMAGE: ", labValues_fromImg);

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

    const labPixel = convertXYZtoCIELAB(xyzPixel);
    labValues_lookupTable.push(labPixel);
  }

  console.log("Lab values from LOOKUP TABLE: ", labValues_lookupTable);

  //colors being output to screen
  const colorsArray = Object.entries(colors).map((color) => {
    const truncatedKey = color[0].split("A")[0]; //removing the Alpha value
    return {
      colorKey: truncatedKey,
      quantity: color[1],
      ...extractDigits(color[0]),
    };
  });

  //filtering out transparent pixels
  const filteredColors = colorsArray.filter((color) => color.a !== 0);

  //looping through colors (from img) and comparing against lookup table
  for (let i = 0; i < filteredColors.length; i++) {
    //if the EXACT color exists in table
    if (filteredColors[i].colorKey in scrapedColors) {
      filteredColors[i].name = scrapedColors[filteredColors[i].colorKey];
    }
    //now need to find the closest possible color from lookup table
  }

  return (
    <ul className={classes.list}>
      {filteredColors.map((color) => (
        <li key={color.colorKey}>
          <div
            className={classes["color-swatch"]}
            style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
          />
          <span>{color.name ? color.name : color.colorKey}</span>
          <span>{color.quantity}</span>
        </li>
      ))}
    </ul>
  );
};

export default ColorsList;
