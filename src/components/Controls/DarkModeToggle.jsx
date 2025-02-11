import { styled } from "@mui/system";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Switch } from "@mui/material";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 30,
  padding: 8,
  "& .MuiSwitch-switchBase": {
    padding: 4,
    transition: "transform 0.3s ease",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#444" : "#132254",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 26,
    height: 26,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 18,
    },
  },
  "& .MuiSwitch-track": {
    width: 44, // Make the track shorter
    height: 16, // Adjust height
    borderRadius: 10,
    backgroundColor: theme.palette.mode === "dark" ? "#444" : "#b1c2ff",
    opacity: 1,
  },
}));

const DarkModeToggle = ({ checked, onChange }) => {
  return (
    <ThemeSwitch
      checked={checked}
      onChange={onChange}
      icon={
        <LightMode
          sx={{
            color: "#fff",
            background: "#3b68ff",
            borderRadius: "50% 50%",
            padding: "2px",
          }}
        />
      }
      checkedIcon={
        <DarkMode
          sx={{
            color: "#3b68ff",
            background: "#000",
            borderRadius: "50% 50%",
            padding: "3px",
          }}
        />
      }
    />
  );
};

export default DarkModeToggle;
