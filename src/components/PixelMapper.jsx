import { useContext, useEffect, useRef, useState } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ file }) {
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  const {
    setColorPalette,
    colorPalette,
    imagePixelData,
    setImagePixelData,
    lookupTableValues,
    setLookupTableValues,
  } = useContext(ColorsContext);
  const [blobURL, setBlobURL] = useState(null);

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
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { width, height, pixels } = imagePixelData;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;

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
        // setBlobURL(url);

        // Clean up the Blob URL after it's used
        return () => URL.revokeObjectURL(url);
      },
      "image/png",
      1.0 // Quality parameter for PNG
    );
  }, [colorPalette, imagePixelData]);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}

export default PixelMapper;
