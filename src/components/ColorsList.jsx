import ColorsContext from "../context/colors-context";
import KDTree from "../model/kd-tree";
import classes from "./ColorsList.module.css";
import { useContext, useEffect, useMemo } from "react";

const formatWithComma = (number) => Intl.NumberFormat("en-US").format(number);

const ColorsList = ({ scrapedColors }) => {
  const { colorPalette, lookupTableValues } = useContext(ColorsContext);

  // const colorLookupTree = useMemo(
  //   () => new KDTree(lookupTableValues),
  //   [lookupTableValues]
  // );

  const colorPaletteArray = Object.values(colorPalette);
  const outputColors = [];
  let totalPixels = 0;

  for (let i = 0; i < colorPaletteArray.length; i++) {
    const color = { ...colorPaletteArray[i] };
    const { r, g, b, a } = color;
    const colorKey = `R${r}G${g}B${b}`;
    const name = colorKey in scrapedColors ? scrapedColors[colorKey] : colorKey;
    color.colorKey = colorKey;
    color.name = name;
    totalPixels += a === 0 ? 0 : color?.quantity;
    outputColors.push(color);
  }

  const filteredColors = outputColors.filter((color) => color.a !== 0);

  return (
    <>
      <p>BEAD COUNT -- {formatWithComma(totalPixels)}</p>
      <p>COLORS -- {formatWithComma(filteredColors.length)}</p>
      <div className={classes["list-container"]}>
        <ul className={classes.list}>
          {filteredColors.map((color) => (
            <li key={color.colorKey}>
              <div
                className={classes["color-swatch"]}
                style={{
                  background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
              />
              <span>{color.name}</span>
              <span>{formatWithComma(color.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ColorsList;
