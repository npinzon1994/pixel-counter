import { useContext, useEffect, useRef, useState } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ file }) {
  const canvasRef = useRef(null);
  const { capturedColors, setCapturedColors, colorPalette, clearList } =
    useContext(ColorsContext);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    console.log("Color palette: ", colorPalette);
  }, [colorPalette]);
  useEffect(() => {
    console.log(
      `Image Dimensions: ${imageDimensions.width}x${imageDimensions.height}`
    );
  }, [imageDimensions]);

  //fires when new image is uploaded by user
  useEffect(() => {
    function parsePixels(rgbStream) {
      const capturedColors = {};
      for (let i = 0; i < rgbStream.length; i += 4) {
        const r = rgbStream[i];
        const g = rgbStream[i + 1];
        const b = rgbStream[i + 2];
        const a = rgbStream[i + 3];
        const colorKey = `R${r}G${g}B${b}A${a}`;

        if (colorKey in capturedColors) {
          capturedColors[colorKey].quantity++;
        } else {
          capturedColors[colorKey] = {
            colorKey,
            name: "",
            r,
            g,
            b,
            a,
            quantity: 1,
          };
        }
      }
      setCapturedColors(capturedColors);
    }

    console.log("CURRENT FILE: ", file);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        context.clearRect(0, 0, image.width, image.height);
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        setImageDimensions({ width: image.width, height: image.height });
      };
      image.src = URL.createObjectURL(file);

      fetch("/api/upload-image", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
          const pixels = data.pixels;
          parsePixels(pixels);
        })
        .catch(console.error);
    }

    return () => {
      console.log("CLEARING LIST...");
      clearList();
    };
  }, [file, setCapturedColors, clearList]);

  //fires when we get back the modified color palette
  useEffect(() => {
    if (!file || !colorPalette || Object.keys(colorPalette).length === 0) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let newImageURL;

    const colorsArray = Object.values(colorPalette);
    const pixelData = new Uint8ClampedArray(
      imageDimensions.width * imageDimensions.height * 4
    ); // RGBA per pixel

    colorsArray.forEach(({ r, g, b, a }, index) => {
      const baseIndex = index * 4;
      pixelData[baseIndex] = r; // Red
      pixelData[baseIndex + 1] = g; // Green
      pixelData[baseIndex + 2] = b; // Blue
      pixelData[baseIndex + 3] = a ?? 255; // Alpha (default to 255 if undefined)
    });

    const imageData = new ImageData(
      pixelData,
      imageDimensions.width,
      imageDimensions.height
    );
    context.putImageData(imageData, 0, 0);

    // Export the canvas as a Blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Failed to create blob from canvas");
          return;
        }
        newImageURL = URL.createObjectURL(blob);
        console.log("New Blob URL:", newImageURL);

        // Clean up the Blob URL after it's used
        URL.revokeObjectURL(newImageURL);
      },
      "image/png",
      1.0 // Quality parameter for PNG
    );

    return () => clearList();
  }, [file, colorPalette, clearList, imageDimensions]);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}

export default PixelMapper;
