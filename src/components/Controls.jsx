import ColorsContext from "../context/colors-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";

const Controls = () => {
  const {setUploadedImage} = useContext(ColorsContext);

  function uploadImageHandler(event) {
    const file = event.target.files[0];
    setUploadedImage(file);
  }

  return (
    <aside className={classes.container}>
      <ImageUploader onUploadImage={uploadImageHandler} />
    </aside>
  );
};

export default Controls;
