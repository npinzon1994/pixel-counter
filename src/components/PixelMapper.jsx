import { useContext, useEffect, useRef, useState } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";
import { generateGrid } from "../util/grid";
import ControlsContext from "../context/controls-context";

function PixelMapper() {
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  const {
    setColorPalette,
    colorPalette,
    imagePixelData,
    setImagePixelData,
    uploadedImage,
    lookupTableValues,
    setLookupTableValues,
  } = useContext(ColorsContext);

  const {
    backgroundSettings,
    gridSettings,
    boardSize,
    zoomLevel,
    setZoomLevel,
    toggleGrid,
  } = useContext(ControlsContext);

  const [grid, setGrid] = useState([]);

  const [isHovering, setIsHovering] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseDown() {
    if (spacePressed) {
      setIsGrabbing(true);
    }
  }

  function handleMouseMove(event) {
    if (isGrabbing) {
      event.preventDefault();
      setPosition((prev) => {
        // Calculate the new position
        const newX = prev.x + event.movementX / zoomLevel;
        const newY = prev.y + event.movementY / zoomLevel;

        const canvas = canvasRef.current;

        // Get the bounds of the main container
        const mainElement = document.getElementById(classes.main);

        // Get the current width/height of the canvas
        const canvasWidth = canvas.width * zoomLevel;
        const canvasHeight = canvas.height * zoomLevel;

        // Get the boundaries of the main element
        const mainWidth = mainElement.offsetWidth;
        const mainHeight = mainElement.offsetHeight;

        // Calculate bounds considering center alignment
        const minX = (mainWidth - canvasWidth) / 2;
        const maxX = (canvasWidth - mainWidth) / 2;
        const minY = (mainHeight - canvasHeight) / 2;
        const maxY = (canvasHeight - mainHeight) / 2;

        // Restrict the position within the bounds
        const boundedX = Math.min(Math.max(newX, minX), maxX);
        const boundedY = Math.min(Math.max(newY, minY), maxY);

        return {
          x: boundedX,
          y: boundedY,
        };
      });
    }
  }

  function handleMouseUp() {
    setIsGrabbing(false);
  }

  //listening for spacebar press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && event.target === document.body) {
        event.preventDefault();
      }
      if (isHovering && event.key === " " && !spacePressed) {
        setSpacePressed(true);
      }
    };
    const handleKeyUp = (event) => {
      if (isHovering && event.key === " ") {
        setSpacePressed(false);
        setIsGrabbing(false);
      }
    };

    if (isHovering) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [spacePressed, isHovering]);

  //1st effect -- FILE UPLOAD
  useEffect(() => {
    if (!uploadedImage || fileRef.current === uploadedImage) {
      return;
    }
    console.log("New File: ", uploadedImage);
    fileRef.current = uploadedImage;
    console.log("Clearing color palette...");
    setColorPalette({});

    const formData = new FormData();
    formData.append("image", uploadedImage);

    fetch("/api/upload-image", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        console.log("Setting image pixel data...");
        setImagePixelData(data);
        // setLookupTableValues(data.lookupTable_LabValues);
      })
      .catch(console.error);
  }, [uploadedImage, setColorPalette, setImagePixelData]);

  //2nd effect -- IMAGE PROCESSING
  useEffect(() => {
    if (!imagePixelData.pixels) {
      return;
    }
    console.log("Image pixel data changed!");
    const colors = {};
    const { pixels } = imagePixelData;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      const colorKey = `R${r}G${g}B${b}A${a}`;

      if (!colors[colorKey]) {
        colors[colorKey] = { colorKey, r, g, b, a, quantity: 1 };
      } else {
        colors[colorKey].quantity++;
      }
    }
    console.log("Setting color palette...");
    setColorPalette(colors);
  }, [imagePixelData, setColorPalette]);

  //3rd effect -- DRAW IMAGE TO CANVAS
  useEffect(() => {
    console.log("Effect 3 running...");
    console.log("Color Palette: ", colorPalette);

    if (!colorPalette || Object.keys(colorPalette).length === 0) {
      return;
    }

    const { width, height, pixels } = imagePixelData;

    const gridLines = generateGrid(
      width,
      height,
      boardSize,
      gridSettings.color
    );

    const grid_svg = (
      <svg viewBox={`0 0 ${width} ${height}`} className={classes["grid-svg"]}>
        {gridLines.vertLines}
        {gridLines.horizLines}
      </svg>
    );
    setGrid(grid_svg);

    //SET UP CANVAS
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height); //clearing prev img
    context.setTransform(1, 0, 0, 1, 0, 0); //reset transformation

    //Account for Zoom Level
    canvas.width = width;
    canvas.height = height;
    // context.scale(zoomLevel, zoomLevel);

    //gather data and draw image
    const pixelData = new Uint8ClampedArray(width * height * 4);

    for (let i = 0; i < pixels.length; i += 4) {
      pixelData[i] = pixels[i];
      pixelData[i + 1] = pixels[i + 1];
      pixelData[i + 2] = pixels[i + 2];
      pixelData[i + 3] = pixels[i + 3];
    }

    const imageData = new ImageData(pixelData, width, height);
    context.putImageData(imageData, 0, 0);

    // Export the canvas as a Blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Failed to create blob from canvas");
          return;
        }
        const url = URL.createObjectURL(blob);
        console.log("URL: ", url);

        // Clean up the Blob URL after it's used
        return () => URL.revokeObjectURL(url);
      },
      "image/png",
      1.0 // Quality parameter for PNG
    );
  }, [colorPalette, imagePixelData, zoomLevel, gridSettings, boardSize]);

  return (
    <main
      id={classes.main}
      className={`${spacePressed ? classes["space-pressed"] : ""} ${
        isGrabbing ? classes["is-grabbing"] : ""
      }`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className={classes["canvas-container"]}
        style={{
          transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <canvas
          ref={canvasRef}
          className={classes.canvas}
          style={{ background: backgroundSettings.color }}
        />
        {gridSettings.isVisible ? grid : undefined}
      </div>
    </main>
  );
}

export default PixelMapper;
