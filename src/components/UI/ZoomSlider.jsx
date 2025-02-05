import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Slider } from "@mui/material";
import { useContext, useRef } from "react";
import ControlsContext from "../../context/controls-context";

const ZoomSlider = () => {
  const { zoomLevel, setZoomLevel } = useContext(ControlsContext);
  const zoomPercentage = `${Math.round(zoomLevel * 100)}%`;

  const intervalRef = useRef(null);

  function startZooming(delta) {
    if (intervalRef.current) return; //prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setZoomLevel((prev) => Math.max(1, Math.min(40, prev + delta)));
    }, 50);
  }

  function stopZooming() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function incrementZoom() {
    setZoomLevel((prev) => (prev += 0.05));
  }

  function decrementZoom() {
    setZoomLevel((prev) => (prev -= 0.05));
  }

  return (
    <Box id="container" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <Slider
        value={zoomLevel}
        min={1}
        max={40}
        step={0.1}
        size="small"
        onChange={(event) => setZoomLevel(+event.target.value)}
        sx={{ width: "100%", maxWidth: "7.25rem" }}
      />
      <Box id="step-counter" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.75 }}>
        <IconButton
          onClick={decrementZoom}
          onPointerDown={() => startZooming(-0.2)}
          onPointerUp={stopZooming}
          onPointerLeave={stopZooming}
          sx={{ padding: 0 }}
        >
          <ArrowDropUp sx={{ color: "#3b68ff", transform: "rotate(-90deg)" }} />
        </IconButton>
        <Typography sx={{ fontSize: "0.65rem" }}>{zoomPercentage}</Typography>
        <IconButton
          onClick={incrementZoom}
          onPointerDown={() => startZooming(0.2)}
          onPointerUp={stopZooming}
          onPointerLeave={stopZooming}
          sx={{ padding: 0 }}
        >
          <ArrowDropDown
            sx={{ color: "#3b68ff", transform: "rotate(-90deg)" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ZoomSlider;
