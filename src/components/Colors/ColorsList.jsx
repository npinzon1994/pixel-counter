import ColorsContext from "../../context/colors-context";
import { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
  useTheme,
} from "@mui/material";

const formatWithComma = (number) => Intl.NumberFormat("en-US").format(number);

const ColorsList = () => {
  const { colorPalette, scrapedColors, setHighlightedColor, highlightedColor } =
    useContext(ColorsContext);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const theme = useTheme();

  const colorPaletteArray = Object.values(colorPalette);
  const outputColors = [];

  for (let i = 0; i < colorPaletteArray.length; i++) {
    const color = { ...colorPaletteArray[i] };
    const { r, g, b } = color;
    const colorKey = `R${r}G${g}B${b}`;
    const name =
      colorKey in scrapedColors ? scrapedColors[colorKey].name : colorKey;
    color.colorKey = colorKey;
    color.name = name;
    outputColors.push(color);
  }

  const filteredColors = outputColors.filter((color) => color.a !== 0);
  const handleListItemClick = (index) => {
    setSelectedIndex((prev) => (index === prev ? null : index));
  };

  const getContrastingTextColor = (r, g, b) => {
    // Calculate luminance using relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff"; // Use black text if background is light
  };

  return (
    <List sx={{ overflow: "auto", padding: 0, maxHeight: "100vh" }}>
      <ListSubheader
        sx={{
          fontSize: theme.typography.small,
          color: theme.palette.text.heading,
          lineHeight: 2,
          paddingBlock: 0.25,
        }}
      >
        COLORS
      </ListSubheader>
      {filteredColors.map((color, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => {
              handleListItemClick(index);
              setHighlightedColor((prev) => {
                if (!prev) {
                  return color;
                }
                return prev.colorKey === color.colorKey ? null : color;
              });
            }}
            tabIndex={0}
            onBlur={() => {
              if (mouseDown) {
                return;
              }
              handleListItemClick(null);
              setHighlightedColor(null);
            }}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            sx={{
              background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`,
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
              paddingBlock: 1.2,
              opacity:
                selectedIndex !== null && selectedIndex !== index ? 0.35 : 1,

              "&:hover": {
                background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.65)`,
              },
              "&.Mui-selected": {
                background: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                "&:hover": {
                  background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`,
                },
              },
            }}
          >
            <Typography
              primary={color.name}
              sx={{
                color: getContrastingTextColor(color.r, color.g, color.b),
                fontSize: theme.typography.small,
                fontWeight: 600,
              }}
            >
              {color.name}
            </Typography>
            <Typography
              sx={{
                color: getContrastingTextColor(color.r, color.g, color.b),
                fontSize: theme.typography.small,
                fontWeight: 600,
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
