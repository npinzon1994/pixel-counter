import ColorsContext from "../../context/colors-context";
import KDTree from "../../model/kd-tree";
import classes from "./ColorsList.module.css";
import { useContext, useState } from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";

const formatWithComma = (number) => Intl.NumberFormat("en-US").format(number);

const ColorsList = () => {
  const { colorPalette, lookupTableValues, imagePixelData, scrapedColors } =
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

  for (let i = 0; i < colorPaletteArray.length; i++) {
    const color = { ...colorPaletteArray[i] };
    const { r, g, b, a } = color;
    const colorKey = `R${r}G${g}B${b}`;
    const name = colorKey in scrapedColors ? scrapedColors[colorKey] : colorKey;
    color.colorKey = colorKey;
    color.name = name;
    outputColors.push(color);
  }

  const filteredColors = outputColors.filter((color) => color.a !== 0);

  const getContrastingTextColor = (r, g, b) => {
    // Calculate luminance using relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff"; // Use black text if background is light
  };

  return (
    <List sx={{ overflow: "auto", padding: 0, maxHeight: "100vh" }}>
      {filteredColors.map((color, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{
              background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`,
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
              paddingBlock: 2,
              opacity:
                selectedIndex !== null && selectedIndex !== index ? 0.35 : 1,

              "&:hover": {
                background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.65)`,
              },
            }}
          >
            <Typography
              primary={color.name}
              sx={{
                color: getContrastingTextColor(color.r, color.g, color.b),
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              {color.name}
            </Typography>
            <Typography
              sx={{
                color: getContrastingTextColor(color.r, color.g, color.b),
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              {formatWithComma(color.quantity)}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ColorsList;
