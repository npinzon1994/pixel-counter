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

function normalize(rgbMatrix) {
  const normalizedValues = [];
  for (let i = 0; i < rgbMatrix.length; i++) {
    const pixel = [];
    for (let j = 0; j < rgbMatrix[i].length; j++) {
      const rgbValue = rgbMatrix[i][j] / 255;
      pixel.push(rgbValue);
    }
    normalizedValues.push(pixel);
  }
  return normalizedValues;
}

function linearize(rgbMatrix) {
  const linearizedValues = [];
  for (let i = 0; i < rgbMatrix.length; i++) {
    const pixel = [];
    for (let j = 0; j < rgbMatrix[i].length; j++) {
      const rgbValue = Math.pow(rgbMatrix[i][j], 1 / 2.2);
      pixel.push(rgbValue);
    }
    linearizedValues.push(pixel);
  }
  return linearizedValues;
}

function multiplyMatrices(matrixA, matrixB) {
  // Get dimensions of the matrices
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  // Ensure the number of columns in A matches the number of rows in B
  if (colsA !== rowsB) {
    throw new Error(
      "Matrix multiplication not possible: columns of A must equal rows of B"
    );
  }

  // Initialize the result matrix with zeros
  const result = Array(rowsA)
    .fill(null)
    .map(() => Array(colsB).fill(0));

  // Perform the matrix multiplication
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return result;
}

function convertRGBtoXYZ(rgbMatrix) {
  const normalizedMatrix = normalize(rgbMatrix);
  const linearizedMatrix = linearize(normalizedMatrix);
  return multiplyMatrices(CONVERSION_MATRIX, linearizedMatrix);
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
    console.log(scrapedColors);
  }, [scrapedColors]);

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
