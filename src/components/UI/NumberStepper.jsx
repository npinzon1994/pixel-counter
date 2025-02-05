import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const NumberStepper = ({ value }) => {
  const zoomPercentage = `${Math.round(value * 100)}%`;

  return (
    <Box>
      <IconButton>
        <ArrowDropUp />
      </IconButton>
      <Typography>{zoomPercentage}</Typography>
      <IconButton>
        <ArrowDropDown />
      </IconButton>
    </Box>
  );
};

export default NumberStepper;
