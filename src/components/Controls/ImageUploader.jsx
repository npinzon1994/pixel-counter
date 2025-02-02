import classes from "./ImageUploader.module.css";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const ImageUploader = ({ onUploadImage }) => {
  return (
    <div className={classes.container}>
      <input
        type="file"
        id="uploadImage"
        name="uploadImage"
        accept="image/png, image/PNG"
        onChange={onUploadImage}
        style={{ display: "none" }}
      />
      <label htmlFor="uploadImage">
        <Button variant="contained" component="span" endIcon={<UploadIcon />}>Upload</Button>
      </label>
    </div>
  );
};

export default ImageUploader;
