import classes from "./ImageUploader.module.css";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const ImageUploader = ({ onUploadImage }) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="file"
        id="uploadImage"
        name="uploadImage"
        accept="image/png, image/PNG"
        onChange={onUploadImage}
        style={{ display: "none" }}
      />
      <label htmlFor="uploadImage">
        <Button
          variant="contained"
          component="span"
          endIcon={<UploadIcon />}
          size="large"
          fullWidth
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
