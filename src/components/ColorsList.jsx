import ColorsContext from "../context/colors-context";
import classes from "./ColorsList.module.css";
import { useContext } from "react";

const TRANSPARENT = "R0G0B0A0";

const ColorsList = () => {
  const { colors } = useContext(ColorsContext);

  //filtering out transparent pixels
  const filteredColors = Object.entries(colors).filter(
    (color) => color[0] !== TRANSPARENT
  );

  function extractDigits(string) {
    const extractedValues = string.match(/\d+/g).map(Number);
    return {
      r: extractedValues[0],
      g: extractedValues[1],
      b: extractedValues[2],
    };
  }

  const masterColorsList = filteredColors.map((color) => {
    return {
      colorKey: color[0].substring(0, color[0].length - 4),
      quantity: color[1],
      ...extractDigits(color[0]),
    };
  });

  return (
    <ul className={classes.list}>
      {masterColorsList.map((color) => (
        <li key={color.colorKey}>
          <div
            className={classes["color-swatch"]}
            style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
          ></div>
          <span>{color.colorKey}</span>
          <span>{color.quantity}</span>
        </li>
      ))}
    </ul>
  );
};

export default ColorsList;
