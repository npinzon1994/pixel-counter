import { useContext, useEffect, useRef } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ file }) {
  const canvasRef = useRef(null);
  const { capturedColors, setCapturedColors, colorPalette, clearList } =
    useContext(ColorsContext);

  useEffect(() => {
    console.log("Color palette: ", colorPalette);
  }, [colorPalette]);

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

    // console.log("EFFECT RUNNING...");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
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

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create blob from canvas");
        return;
      }
      const newImageURL = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height); //need to clear canvas before redraw
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Log the pixel data
        console.log("Canvas Image Data:", imageData.data);

        // Revoke the Blob URL once the image is fully loaded and drawn
        URL.revokeObjectURL(newImageURL);
        console.log("Blob URL revoked:", newImageURL);
      };

      image.onerror = (error) => {
        console.error("Error loading image:", error);
        URL.revokeObjectURL(newImageURL); // Clean up even on error
      };

      console.log("New URL:", newImageURL);
      image.src = newImageURL;
    }, "image/png");
  }, [file, colorPalette]);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}

export default PixelMapper;
