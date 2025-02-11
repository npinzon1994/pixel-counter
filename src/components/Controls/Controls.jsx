import ColorsContext from "../../context/colors-context";
import ControlsContext from "../../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import ColorPicker from "./ColorPicker";
import logo from "../../assets/logo.svg";
import {
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import ZoomSlider from "../UI/ZoomSlider";
import DarkModeToggle from "./DarkModeToggle";
import BoardPicker from "./BoardPicker";

const Controls = () => {
  const { setUploadedImage } = useContext(ColorsContext);
  const {
    backgroundSettings,
    gridSettings,
    setBackgroundColor,
    setGridColor,
    toggleGrid,
    toggleBackground,
  } = useContext(ControlsContext);
  const theme = useTheme();

  function uploadImageHandler(event) {
    const file = event.target.files[0];
    setUploadedImage(file);
  }

  return (
    <Box
      id={classes["controls-wrapper"]}
      sx={{ borderRight: "1px solid", borderColor: "divider" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "7.25rem",
          display: "flex",
          justifyContent: "center",
          marginBottom: "0.65rem",
        }}
      >
        <img
          src={logo}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
      <ImageUploader onUploadImage={uploadImageHandler} />

      <ColorPicker
        name="Background"
        isVisible={backgroundSettings.isVisible}
        color={backgroundSettings.color}
        setColor={setBackgroundColor}
        toggleControl={toggleBackground}
      />
      <ColorPicker
        name="Grid"
        isVisible={gridSettings.isVisible}
        color={gridSettings.color}
        setColor={setGridColor}
        toggleControl={toggleGrid}
      />
      <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            color: theme.palette.text.heading,
            fontSize: theme.typography.small,
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          Zoom
        </Typography>
        <ZoomSlider />
      </Box>

      <BoardPicker />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "space-between",
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
          Mode
        </Typography>
        <DarkModeToggle
          checked={theme.palette.darkModeState}
          onChange={() => {
            console.log("WORK?>?!");
            return theme.palette.toggleDarkMode((prev) => !prev);
          }}
        />
      </Box>
    </Box>
  );
};

export default Controls;
