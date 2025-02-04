import { useContext, useRef, useState } from "react";
import classes from "./ColorPicker.module.css";
import { Popover, IconButton, Typography, Box, useTheme } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { HexColorPicker } from "react-colorful";
import ControlsContext from "../../context/controls-context";

const ColorPicker = ({ name, isVisible, color, setColor, toggleControl }) => {
  const colorPickerButton = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const theme = useTheme();

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };
  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        // width: "100%",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.text.heading,
          fontSize: theme.typography.small,
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <IconButton
          aria-label={`${name}-color`}
          ref={colorPickerButton}
          onClick={toggleColorPicker}
          sx={{
            background: "black",
            borderRadius: 0,
            height: 42,
            width: 42,
            boxShadow: "white 0 0 1px 2px",
          }}
        >
          <SquareIcon
            sx={{
              color,
              fontSize: 42,
            }}
          />
        </IconButton>
        <Popover
          id="background-popover"
          open={showColorPicker}
          anchorEl={colorPickerButton.current}
          onClose={closeColorPicker}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <HexColorPicker color={color} onChange={setColor} />
        </Popover>
        <IconButton
          onClick={toggleControl}
          style={{
            height: 40,
            width: 40,
            boxShadow:
              "inset 2px 2px 6px rgba(255, 255, 255, 0.1), inset -2px -2px 6px rgba(0, 0, 0, 0.7)", // Soft highlights and inner shadows
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow:
                "inset 3px 3px 8px rgba(255, 255, 255, 0.15), inset -3px -3px 8px rgba(0, 0, 0, 0.8)", // Slight glow effect on hover
            },
            "&:active": {
              boxShadow:
                "inset 5px 5px 10px rgba(255, 255, 255, 0.2), inset -5px -5px 10px rgba(0, 0, 0, 0.9)", // More pronounced inner glow
              background: "#202020", // Slightly lighter pressed effect
            },
          }}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <PowerSettingsNewIcon
            sx={{
              color: `${isVisible ? "#3b68ff" : "gray"}`,
              fontSize: 24,
              textShadow: "0px 0px 8px rgba(59, 104, 255, 0.7)",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ColorPicker;
