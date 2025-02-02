import {useRef, useState} from "react";
import classes from "./ColorPicker.module.css";
import { Popover, IconButton } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({name, isVisible, color, setColor, toggleControl}) => {
  const colorPickerButton = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };
  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  return (
    <div className={classes[""]}>
      <p className={classes.name}>{name}</p>
      <div className={classes.container}>
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
          <HexColorPicker
            color={color}
            onChange={setColor}
          />
        </Popover>
        <IconButton
          onClick={toggleControl}
          style={{ height: 42, width: 42 }}
        >
          <PowerSettingsNewIcon
            sx={{
              color: `${isVisible ? "limegreen" : "gray"}`,
              fontSize: 30,
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ColorPicker;
