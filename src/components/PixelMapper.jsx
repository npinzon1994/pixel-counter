import { useContext, useEffect, useRef, useState } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ file }) {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const fileRef = useRef(null);

  const {
    setColorPalette,
    colorPalette,
    imagePixelData,
    setImagePixelData,
    lookupTableValues,
    setLookupTableValues,
  } = useContext(ColorsContext);
  const [grid, setGrid] = useState([]);

  //1st effect -- FILE UPLOAD
  useEffect(() => {
    if (!file || fileRef.current === file) {
      return;
    }
    console.log("File changed!");
    fileRef.current = file;
    console.log("Clearing color palette...");
    setColorPalette({});

    const formData = new FormData();
    formData.append("image", file);

    fetch("/api/upload-image", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        console.log("Setting image pixel data...");
        setImagePixelData(data);
        // setLookupTableValues(data.lookupTable_LabValues);
      })
      .catch(console.error);
  }, [file, setColorPalette, setImagePixelData]);

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

    const scaleFactor = 10;
    const { width, height, pixels } = imagePixelData;

    const verticalLines = [];
    for (let i = 0; i <= width; i++) {
      const line = (
        <line
          key={`v-${i}`}
          x1={i}
          y1={0}
          x2={i}
          y2={height + 1}
          strokeWidth={0.1}
          stroke="rgb(0, 0, 0, 1)"
        />
      );
      verticalLines.push(line);
    }

    const horizontalLines = [];
    for (let i = 0; i <= height; i++) {
      const line = (
        <line
          x1={0}
          y1={i}
          x2={width + 1}
          y2={i}
          strokeWidth={0.1}
          stroke="rgb(0, 0, 0, 1)"
        />
      );
      horizontalLines.push(line);
    }

    const grid_svg = (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={classes["grid_svg"]}
      >
        {verticalLines}
        {horizontalLines}
      </svg>
    );
    setGrid(grid_svg);

    //set up canvases
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const grid = gridRef.current;
    // const gridContext = grid.getContext("2d");

    //clearing prev img
    context.clearRect(0, 0, canvas.width, canvas.height);
    // gridContext.clearRect(0, 0, grid.width, grid.height);

    //reset transformation
    context.setTransform(1, 0, 0, 1, 0, 0);
    // gridContext.setTransform(1, 0, 0, 1, 0, 0);

    //establishing dimensions - scaling up canvas size to allow for grid lines
    canvas.width = width;
    canvas.height = height;
    // grid.width = width;
    // grid.height = height;

    context.scale(scaleFactor, scaleFactor);
    // gridContext.scale(scaleFactor, scaleFactor);

    //gather data and draw image
    //use original width and height for pixels & grid because scaling happens separately
    const pixelData = new Uint8ClampedArray(width * height * 4);

    for (let i = 0; i < pixels.length; i += 4) {
      pixelData[i] = pixels[i];
      pixelData[i + 1] = pixels[i + 1];
      pixelData[i + 2] = pixels[i + 2];
      pixelData[i + 3] = pixels[i + 3];
    }

    const imageData = new ImageData(pixelData, width, height);
    context.putImageData(imageData, 0, 0);

    // const lineWidth = 1 / scaleFactor;

    //draw grid lines
    // gridContext.strokeStyle = "black";
    // gridContext.lineWidth = lineWidth;

    // for (let x = 0; x < grid.width; x++) {
    //   gridContext.beginPath();
    //   gridContext.moveTo(x + 0.5, 0);
    //   gridContext.lineTo(x + 0.5, grid.height);
    //   gridContext.stroke();
    // }

    // for (let y = 0; y < grid.height; y++) {
    //   gridContext.beginPath();
    //   gridContext.moveTo(0, y);
    //   gridContext.lineTo(grid.width, y);
    //   gridContext.stroke();
    // }

    // Export the canvas as a Blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Failed to create blob from canvas");
          return;
        }
        const url = URL.createObjectURL(blob);
        console.log("URL: ", url);
        // setBlobURL(url);

        // Clean up the Blob URL after it's used
        return () => URL.revokeObjectURL(url);
      },
      "image/png",
      1.0 // Quality parameter for PNG
    );
  }, [colorPalette, imagePixelData]);

  return (
    <div className={classes["canvas-container"]}>
      <canvas ref={canvasRef} className={classes.canvas} />
      {grid ? grid : undefined}
    </div>
  );
}

export default PixelMapper;
