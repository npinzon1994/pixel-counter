import classes from "./ImageUploader.module.css";
import { useState } from "react";
import PixelMapper from "./PixelMapper";

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  function uploadImage(event) {
    const imagePath = URL.createObjectURL(event.target.files[0]);
    setUploadedImage(imagePath);
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
      {uploadedImage ? (
        <div className={classes["img-container"]}>
          <img src={uploadedImage} style={{display: "none"}} />
        </div>
      ) : (
        <p>NO IMAGE SELECTED</p>
      )}
      <PixelMapper src={uploadedImage}/>
    </>
  );
};

export default ImageUploader;
