import ColorsContext from "../context/colors-context";
import ControlsContext from "../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import { HexColorPicker } from "react-colorful";
import Slider from "@mui/material/Slider";

const Controls = () => {
  const { setUploadedImage } = useContext(ColorsContext);
  const {
    backgroundSettings,
    gridSettings,
    zoomLevel,
    setZoomLevel,
    setBackgroundColor,
    setGridColor,
    setBoardSize,
    toggleGrid,
  } = useContext(ControlsContext);

  function uploadImageHandler(event) {
    const file = event.target.files[0];
    setUploadedImage(file);
  }

  return (
    <aside id={classes["controls-wrapper"]}>
      <ImageUploader onUploadImage={uploadImageHandler} />
      <div className={classes.container}>
        <HexColorPicker
          color={backgroundSettings.color}
          onChange={setBackgroundColor}
        />
        <button type="button" onClick={toggleGrid}>
          Grid
        </button>
      </div>
      <HexColorPicker color={gridSettings.color} onChange={setGridColor} />
      <div className={classes["board-size-container"]}>
        <label htmlFor="board-size">Board Size</label>
        <select id="board-size" onChange={setBoardSize}>
          <option value="mini">Perler Mini - 28x28</option>
          <option value="large">Perler Large - 29x29</option>
          <option value="super-portrait">
            Perler Super (Portrait) - 49x69
          </option>
          <option value="super-landscape">
            Perler Super (Landscape) - 69x49
          </option>
        </select>
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
