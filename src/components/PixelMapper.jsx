import { useContext, useEffect, useRef } from "react";
import classes from "./PixelMapper.module.css";
import ColorsContext from "../context/colors-context";

function PixelMapper({ src }) {
  const canvasRef = useRef(null);
  const { addPixel, clearList } = useContext(ColorsContext);

  //fires when new image is uploaded by user
  useEffect(() => {
    console.log("EFFECT RUNNING...");
    const canvas = canvasRef.current; //canvas HTML element
    const context = canvas.getContext("2d"); //establishes the plane
    const image = new Image(); //image we're working with

    //fires immediately after browser loads image
    image.onload = () => {
      //matching canvas height and width to image's height and width
      canvas.width = image.width;
      canvas.height = image.height;

      //drawing image on canvas starting at 0,0
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data; //Uint8ClampedArray

      // Access pixel data
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        const colorKey = `R${r}G${g}B${b}A${a}`;
        console.log("ColorKey: ", colorKey);
        addPixel(colorKey);
      }
    };

    image.src = src;

    return () => {
      console.log("CLEARING LIST...");
      clearList();
    };
  }, [src, addPixel, clearList]);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}

export default PixelMapper;
