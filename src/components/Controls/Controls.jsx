import ColorsContext from "../../context/colors-context";
import ControlsContext from "../../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import Slider from "@mui/material/Slider";
import ColorPicker from "./ColorPicker";
import {
  Select,
  MenuItem,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Grid2,
} from "@mui/material";

const Controls = () => {
  const { setUploadedImage } = useContext(ColorsContext);
  const {
    backgroundSettings,
    gridSettings,
    zoomLevel,
    boardSize,
    setZoomLevel,
    setBackgroundColor,
    setGridColor,
    setBoardSize,
    toggleGrid,
    toggleBackground,
  } = useContext(ControlsContext);

  function uploadImageHandler(event) {
    const file = event.target.files[0];
    setUploadedImage(file);
  }

  return (
    <aside id={classes["controls-wrapper"]}>
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

      <div className={classes["board-size-container"]}>
        <InputLabel id="board-size" sx={{ color: "white", userSelect: "none" }}>
          Board Size
        </InputLabel>
        <Grid2 container spacing={2} direction="row" justifyContent="center">
          <ToggleButtonGroup
            value={boardSize}
            exclusive
            onChange={setBoardSize}
            aria-label="boardSize"
            fullWidth
          >
            <Grid2 item xs={8}>
              <Grid2 item xs={4}>
                <ToggleButton value="mini" aria-label="perler mini bead board">
                  Mini
                  <br />
                  28x28
                </ToggleButton>
              </Grid2>
              <Grid2 item xs={4}>
                <ToggleButton
                  value="large"
                  aria-label="perler large bead board"
                >
                  Large
                  <br />
                  29x29
                </ToggleButton>
              </Grid2>

              <Grid2 item xs={8}>
                <Grid2 item xs={4}>
                  <ToggleButton
                    value="super-portrait"
                    aria-label="perler super portrait bead board"
                  >
                    Super Portrait
                    <br />
                    49x69
                  </ToggleButton>
                </Grid2>
                <Grid2 item xs={4}>
                  <ToggleButton
                    value="super-landscape"
                    aria-label="perler super landscape bead board"
                  >
                    Super Landscape
                    <br />
                    69x49
                  </ToggleButton>
                </Grid2>
              </Grid2>
            </Grid2>
          </ToggleButtonGroup>
        </Grid2>
      </div>
      <Slider
        value={zoomLevel}
        min={1}
        max={40}
        step={0.1}
        onChange={setZoomLevel}
      />
    </aside>
  );
};

export default Controls;
