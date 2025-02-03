import ColorsContext from "../../context/colors-context";
import ControlsContext from "../../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import Slider from "@mui/material/Slider";
import ColorPicker from "./ColorPicker";
import logo from "../../assets/logo.svg";
import {
  Switch,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Grid2,
  Typography,
  Box,
} from "@mui/material";

const Controls = () => {
  const { setUploadedImage } = useContext(ColorsContext);
  const {
    backgroundSettings,
    gridSettings,
    zoomLevel,
    boardSize,
    darkMode,
    setZoomLevel,
    setBackgroundColor,
    setGridColor,
    setBoardSize,
    toggleGrid,
    toggleBackground,
    toggleDarkMode,
  } = useContext(ControlsContext);

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
          maxWidth: "10rem",
          display: "flex",
          justifyContent: "center",
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
      <Box style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <Typography>Zoom</Typography>
        <Slider
          value={zoomLevel}
          min={1}
          max={40}
          step={0.1}
          onChange={setZoomLevel}
        />
      </Box>

      <div className={classes["board-size-container"]}>
        <InputLabel id="board-size" sx={{ userSelect: "none" }}>
          Board Size
        </InputLabel>
        <Grid2 container spacing={2} direction="row" justifyContent="center">
          <ToggleButtonGroup
            value={boardSize}
            exclusive
            onChange={setBoardSize}
            aria-label="boardSize"
            orientation="vertical"
          >
            <ToggleButton
              value="mini"
              aria-label="perler mini bead board"
              sx={{ borderRadius: 0 }}
            >
              Mini
              <br />
              28x28
            </ToggleButton>

            <ToggleButton
              value="large"
              aria-label="perler large bead board"
              sx={{ borderRadius: 0 }}
            >
              Large
              <br />
              29x29
            </ToggleButton>

            <ToggleButton
              value="super-portrait"
              aria-label="perler super portrait bead board"
              sx={{ borderRadius: 0 }}
            >
              Super Portrait
              <br />
              49x69
            </ToggleButton>

            <ToggleButton
              value="super-landscape"
              aria-label="perler super landscape bead board"
              sx={{ borderRadius: 0 }}
            >
              Super Landscape
              <br />
              69x49
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid2>
      </div>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
    </Box>
  );
};

export default Controls;
