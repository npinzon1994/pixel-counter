import { useContext, useEffect, useRef } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ file }) {
  const canvasRef = useRef(null);
  const { addPixel, clearList } = useContext(ColorsContext);

  //fires when new image is uploaded by user
  useEffect(() => {
    function parsePixels(pixels) {
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        const colorKey = `R${r}G${g}B${b}A${a}`;
        // console.log("COLOR KEY: ", colorKey);
        addPixel(colorKey);
      }
    }

    console.log("EFFECT RUNNING...");
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
  }, [file, addPixel, clearList]);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}

export default PixelMapper;
