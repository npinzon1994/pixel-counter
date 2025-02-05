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
          slotProps={{
            paper: {
              sx: {
                borderRadius: "0px", // Remove rounding from the popover container
                padding: "18px",
                background: "transparent",
                
              },
            },
          }}
        >
          <div style={{ borderRadius: "0px" }}>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </Popover>
        <IconButton
          onClick={toggleControl}
          style={{
            height: 40,
            width: 40,
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
