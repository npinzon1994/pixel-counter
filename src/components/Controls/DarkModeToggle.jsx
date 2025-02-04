import { styled } from "@mui/system";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { useContext } from "react";
import ControlsContext from "../../context/controls-context";

const DarkModeToggle = ({ checked, onChange }) => {
  
  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 2,
      transition: "transform 0.3s ease",
      "&.Mui-checked": {
        transform: "translateX(24px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#3b68ff" : "#ffcc00",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: 22,
      height: 22,
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        fontSize: 18,
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "dark" ? "#444" : "#ffcc00",
      opacity: 1,
    },
  }));

  return (
    <ThemeSwitch
      checked={checked}
      onChange={onChange}
      icon={<LightMode sx={{ color: "#ffcc00" }} />}
      checkedIcon={<DarkMode sx={{ color: "#444" }} />}
    />
  );
};

export default DarkModeToggle;
