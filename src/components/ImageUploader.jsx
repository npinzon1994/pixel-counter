import classes from "./ImageUploader.module.css";

const ImageUploader = ({ onUploadImage }) => {
  return (
    <form className={classes.form}>
      <label>UPLOAD IMAGE</label>
      <input
        type="file"
        id="uploadImage"
        name="uploadImage"
        accept="image/png, image/PNG"
        onChange={onUploadImage}
      />
    </form>
  );
};

export default ImageUploader;
