import { useContext } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import ColorsContext from "../../context/colors-context";

const BeadFilter = () => {
  const { selectedBrands, setSelectedBrands, beadSize, setBeadSize } =
    useContext(ColorsContext);

  function handleBeadSizeChange(event) {
    setBeadSize(event.target.value);
  }

  const theme = useTheme();

  return (
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <FormGroup
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: theme.typography.small,
            },
          }}
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              checked={selectedBrands.perler}
              onChange={() =>
                setSelectedBrands((prev) => {
                  if (
                    prev.perler === true &&
                    prev.artkal === false &&
                    prev.top_tier === false
                  ) {
                    return { ...prev };
                  }
                  return { ...prev, perler: !prev.perler };
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Perler"
        />
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: theme.typography.small,
            },
          }}
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              checked={selectedBrands.artkal}
              onChange={() =>
                setSelectedBrands((prev) => {
                  if (
                    prev.artkal === true &&
                    prev.perler === false &&
                    prev.top_tier === false
                  ) {
                    return { ...prev };
                  }
                  return { ...prev, artkal: !prev.artkal };
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Artkal"
        />
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: theme.typography.small,
            },
          }}
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              checked={selectedBrands.top_tier}
              onChange={() =>
                setSelectedBrands((prev) => {
                  if (
                    prev.top_tier === true &&
                    prev.perler === false &&
                    prev.artkal === false
                  ) {
                    return { ...prev };
                  }
                  return {
                    ...prev,
                    top_tier: !prev.top_tier,
                  };
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Top Tier"
        />
      </FormGroup>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="bead-size" sx={{ fontSize: theme.typography.small }}>
          Bead Size
        </InputLabel>
        <Select
          labelId="bead-size"
          id="bead-size"
          label="Size"
          value={beadSize}
          onChange={handleBeadSizeChange}
          sx={{
            fontSize: theme.typography.small,
            "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
              paddingBlock: 1.2,
            },
          }}
        >
          <MenuItem value="midi" sx={{ fontSize: theme.typography.small }}>
            Midi
          </MenuItem>
          <MenuItem value="mini" sx={{ fontSize: theme.typography.small }}>
            Mini
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BeadFilter;
