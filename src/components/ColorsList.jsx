import ColorsContext from "../context/colors-context";
import classes from "./ColorsList.module.css";
import { useContext, useEffect, useState } from "react";

const TRANSPARENT = "R0G0B0A0";

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

  /**
   * Loop through all colors in masterColorsList.
   * For each color, compare it against every color in
   * the lookup table until we get a match.
   * Then add the name to that object in the masterColorsList
   * as a new property.
   */

  const ultimateList = [];
  for (let i = 0; i < masterColorsList.length; i++) {
    if (masterColorsList[i].colorKey in scrapedColors) {
      //if color exists in lookup table
      ultimateList.push({
        name: scrapedColors[masterColorsList[i].colorKey],
        colorKey: masterColorsList[i].colorKey,
        quantity: masterColorsList[i].quantity,
        r: masterColorsList[i].r,
        g: masterColorsList[i].g,
        b: masterColorsList[i].b,
      });
    } else {
      ultimateList.push({
        colorKey: masterColorsList[i].colorKey,
        quantity: masterColorsList[i].quantity,
        r: masterColorsList[i].r,
        g: masterColorsList[i].g,
        b: masterColorsList[i].b,
      });
    }
  }

  return (
    <>
      <p>PARAGRAPH</p>
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
    </>
  );
};

export default ColorsList;
