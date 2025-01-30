const Slider = ({ zoomLevel, onSetZoomLevel }) => {
  const setZoomLevelHandler = (zoomLevel) => {
    onSetZoomLevel(zoomLevel);
  };

  return (
    <div>
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        value={zoomLevel}
        onChange={setZoomLevelHandler}
        

      />
    </div>
  );
};

export default Slider;
