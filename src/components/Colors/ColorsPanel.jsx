import ColorsList from "./ColorsList";
import classes from "./ColorsPanel.module.css";
import { useContext } from "react";
import ColorsContext from "../../context/colors-context";
import ProjectInfoWindow from "./ProjectInfoWindow";
import { Box } from "@mui/material";
import BeadFilter from "./BeadFilter";

const ColorsPanel = () => {
  const { colorPalette } = useContext(ColorsContext);
  const colorsNotEmpty = Object.values(colorPalette).length > 0;

  return (
    <Box
      className={classes.panel}
      sx={{ borderLeft: "1px solid", borderColor: "divider" }}
    >
      <ProjectInfoWindow />
      <BeadFilter />
      {colorsNotEmpty ? <ColorsList /> : <p>No image selected</p>}
    </Box>
  );
};

export default ColorsPanel;
