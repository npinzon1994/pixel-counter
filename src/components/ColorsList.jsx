import ColorsContext from "../context/colors-context";
import KDTree from "../model/kd-tree";
import classes from "./ColorsList.module.css";
import { useContext, useState } from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";

const formatWithComma = (number) => Intl.NumberFormat("en-US").format(number);

const ColorsList = ({ scrapedColors }) => {
  const { colorPalette, lookupTableValues, imagePixelData } =
    useContext(ColorsContext);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

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
    <aside className={classes.wrapper}>
      <div className={classes["bead-counts"]}>
        <p>Beads: {formatWithComma(totalPixels)}</p>
        <p>Colors: {formatWithComma(filteredColors.length)}</p>
        <p>Size: {`${imagePixelData.width}x${imagePixelData.height}`}</p>
      </div>
      <List sx={{ overflow: "auto", padding: 0 }}>
        {filteredColors.map((color, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem"
              }}
            >
              <Typography
                primary={color.name}
                sx={{
                  fontFamily: "Yusei Magic, serif",
                  textShadow: "0px 0px 5px black",
                }}
              >
                {color.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Yusei Magic, serif",
                  textShadow: "0px 0px 5px black",
                }}
              >
                {formatWithComma(color.quantity)}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
};

export default ColorsList;
