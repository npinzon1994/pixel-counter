import classes from "./ImageUploader.module.css";
import { useState } from "react";
import PixelMapper from "./PixelMapper";

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  function uploadImage(event) {
    const file = event.target.files[0];

    setUploadedImage(file);
    console.log(file);
  }

  return (
    <>
      <form className={classes.form}>
        <label>UPLOAD IMAGE</label>
        <input
          type="file"
          id="uploadImage"
          name="uploadImage"
          accept="image/png, image/PNG"
          onChange={uploadImage}
        />
      </form>
      {uploadedImage ? <PixelMapper file={uploadedImage} /> : undefined}
    </>
  );
};

export default ImageUploader;
