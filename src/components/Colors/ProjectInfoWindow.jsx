import { Grid2, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import ColorsContext from "../../context/colors-context";

const formatWithComma = (number) => Intl.NumberFormat("en-US").format(number);

const ProjectInfoWindow = () => {
  const { colorPalette, imagePixelData } = useContext(ColorsContext);
  const colorPaletteArray = Object.values(colorPalette);
  let totalPixels = 0;
  for (const color of colorPaletteArray) {
    totalPixels += +color.a === 0 ? 0 : +color?.quantity;
  }

  useEffect(() => {
    console.log("Color Palette: ", colorPalette);
  }, [colorPalette]);

  return (
    <Grid2
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto",
        padding: 1,
      }}
    >
      <Grid2
        item
        xs={6}
        sx={{
          padding: 1,
          borderRight: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 300 }}>
          Beads
        </Typography>
        <Typography
          sx={{ fontSize: "1.7rem", fontWeight: 700, paddingRight: 1, color: "#7292FF" }}
        >
          {formatWithComma(totalPixels)}
        </Typography>
      </Grid2>
      <Grid2
        item
        xs={6}
        sx={{ padding: 1, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 300 }}>
          Colors
        </Typography>
        <Typography sx={{ fontSize: "1.7rem", fontWeight: 700, color: "#7292FF" }}>
          {formatWithComma(colorPaletteArray.length)}
        </Typography>
      </Grid2>
      <Grid2
        item
        xs={12}
        sx={{ paddingTop: 1, paddingInline: 0.25 }}
      >
        <Typography
          sx={{ fontSize: "0.75rem", fontWeight: 300, paddingLeft: 1, fontStyle: "italic" }}
        >{`${imagePixelData.width} x ${imagePixelData.height} (W x H)`}</Typography>
      </Grid2>
    </Grid2>
  );
};

export default ProjectInfoWindow;
