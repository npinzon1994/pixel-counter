import ColorsContext from "../../context/colors-context";
import ControlsContext from "../../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import ColorPicker from "./ColorPicker";
import logo from "../../assets/logo.svg";
import {
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { DarkMode, LightMode } from "@mui/icons-material";
import ZoomSlider from "../UI/ZoomSlider";

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

const Controls = () => {
  const { setUploadedImage } = useContext(ColorsContext);
  const {
    backgroundSettings,
    gridSettings,
    boardSize,
    setBackgroundColor,
    setGridColor,
    setBoardSize,
    toggleGrid,
    toggleBackground,
  } = useContext(ControlsContext);
  const theme = useTheme();

  function uploadImageHandler(event) {
    const file = event.target.files[0];
    setUploadedImage(file);
  }

  const isMini = boardSize === "mini";
  const isLarge = boardSize === "large";
  const isPortrait = boardSize === "super-portrait";
  const isLandscape = boardSize === "super-landscape";

  const boardIconColor = theme.palette.mode === "dark" ? "white" : "black";
  const selectedIconColor =
    theme.palette.mode === "dark" ? "#7292ff" : "#3b68ff";

  const selectedTextColor =
    theme.palette.mode === "dark" ? "#b1c2ff" : "#3b68ff";

  return (
    <Box
      id={classes["controls-wrapper"]}
      sx={{ borderRight: "1px solid", borderColor: "divider" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "7.25rem",
          display: "flex",
          justifyContent: "center",
          marginBottom: "0.65rem",
        }}
      >
        <img
          src={logo}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
      <ImageUploader onUploadImage={uploadImageHandler} />
      {/* <Divider
        sx={{
          my: 0,
          borderColor: "divider",
          borderBottomWidth: 2,
          width: "100%",
        }}
      /> */}

      <ColorPicker
        name="Background"
        isVisible={backgroundSettings.isVisible}
        color={backgroundSettings.color}
        setColor={setBackgroundColor}
        toggleControl={toggleBackground}
      />
      <ColorPicker
        name="Grid"
        isVisible={gridSettings.isVisible}
        color={gridSettings.color}
        setColor={setGridColor}
        toggleControl={toggleGrid}
      />
      <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            color: theme.palette.text.heading,
            fontSize: theme.typography.small,
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          Zoom
        </Typography>

        <ZoomSlider />
      </Box>

      <div className={classes["board-size-container"]}>
        <Typography
          id="board-size"
          sx={{
            color: theme.palette.text.heading,
            fontSize: theme.typography.small,
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          Board Size
        </Typography>
        <ToggleButtonGroup
          value={boardSize}
          exclusive
          orientation="vertical"
          onChange={(event, newValue) => {
            if (newValue !== null) {
              setBoardSize(newValue);
            }
          }}
          aria-label="boardSize"
          sx={{
            width: "100%",
            maxWidth: "7.25rem",
          }}
        >
          <ToggleButton
            value="mini"
            aria-label="perler mini pegboard"
            sx={{
              borderRadius: 0,
              flexDirection: "column",
              gap: 1.5,
              width: "100%",
              textAlign: "center",
              "&.Mui-selected .MuiTypography-root": {
                color: selectedTextColor,
              },
              "&.Mui-selected .MuiTypography-root:first-child": {
                fontWeight: 700,
              },
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1.75rem",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="14"
                  height="14"
                  fill={isMini ? selectedIconColor : boardIconColor}
                  stroke={isMini ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="8"
                  y1="1.5"
                  x2="11"
                  y2="1.5"
                  stroke={isMini ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="7"
                  y1="0.5"
                  x2="12"
                  y2="0.5"
                  stroke={isMini ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="1.5"
                  y1="11"
                  x2="1.5"
                  y2="8"
                  stroke={isMini ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="0.5"
                  y1="12"
                  x2="0.5"
                  y2="7"
                  stroke={isMini ? selectedIconColor : boardIconColor}
                />
              </svg>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  display: "block",
                  minHeight: "1rem",
                  pointerEvents: "none",
                }}
              >
                Mini
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontStyle: "italic",
                  userSelect: "none",
                  color: theme.palette.text.smallText,
                  fontWeight: 300,
                  display: "block",
                  minHeight: "1rem",
                  pointerEvents: "none",
                }}
              >
                28 x 28
              </Typography>
            </div>
          </ToggleButton>

          <ToggleButton
            value="large"
            aria-label="perler large pegboard"
            sx={{
              borderRadius: 0,
              flexDirection: "column",
              gap: 1.5,
              "&.Mui-selected .MuiTypography-root": {
                color: selectedTextColor,
              },
              "&.Mui-selected .MuiTypography-root:first-child": {
                fontWeight: 700,
              },
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "10rem",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                <rect
                  x="2"
                  y="2"
                  width="29"
                  height="29"
                  fill={isLarge ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="1.5"
                  y1="19"
                  x2="1.5"
                  y2="14"
                  stroke={isLarge ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="0.5"
                  y1="20"
                  x2="0.5"
                  y2="13"
                  stroke={isLarge ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="13"
                  y1="1.5"
                  x2="18"
                  y2="1.5"
                  stroke={isLarge ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="12"
                  y1="0.5"
                  x2="19"
                  y2="0.5"
                  stroke={isLarge ? selectedIconColor : boardIconColor}
                />
              </svg>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  pointerEvents: "none",
                  display: "block",
                  minHeight: "1rem",
                }}
              >
                Large
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontStyle: "italic",
                  userSelect: "none",
                  pointerEvents: "none",
                  color: theme.palette.text.smallText,
                  fontWeight: 300,
                  display: "block",
                  minHeight: "1rem",
                }}
              >
                29 x 29
              </Typography>
            </div>
          </ToggleButton>

          <ToggleButton
            value="super-portrait"
            aria-label="perler super portrait pegboard"
            sx={{
              borderRadius: 0,
              flexDirection: "column",
              gap: 1.5,
              gridColumn: "span 2",
              justifyContent: "flex-end",
              "&.Mui-selected .MuiTypography-root": {
                color: selectedTextColor,
              },
              "&.Mui-selected .MuiTypography-root:first-child": {
                fontWeight: 700,
              },
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "2rem",
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <svg
                width="51"
                height="71"
                viewBox="0 0 51 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                <line
                  x1="1.5"
                  y1="13"
                  x2="1.5"
                  y2="8"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="0.5"
                  y1="14"
                  x2="0.5"
                  y2="7"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="24"
                  y1="1.5"
                  x2="29"
                  y2="1.5"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="23"
                  y1="0.5"
                  x2="30"
                  y2="0.499999"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
                <rect
                  x="2"
                  y="71"
                  width="69"
                  height="49"
                  transform="rotate(-90 2 71)"
                  fill={isPortrait ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="1.5"
                  y1="65"
                  x2="1.5"
                  y2="60"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="0.5"
                  y1="66"
                  x2="0.5"
                  y2="59"
                  stroke={isPortrait ? selectedIconColor : boardIconColor}
                />
              </svg>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  wordBreak: "break-word",
                  display: "block",
                  minHeight: "1rem",
                  pointerEvents: "none",
                }}
              >
                Super Portrait
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontStyle: "italic",
                  userSelect: "none",
                  fontWeight: 300,
                  color: theme.palette.text.smallText,
                  display: "block",
                  minHeight: "1rem",
                  pointerEvents: "none",
                }}
              >
                49 x 69
              </Typography>
            </div>
          </ToggleButton>

          <ToggleButton
            value="super-landscape"
            aria-label="perler super landscape pegboard"
            sx={{
              borderRadius: 0,
              gap: 1.75,
              flexDirection: "column",
              gridColumn: "span 2",
              justifyContent: "flex-end",
              "&.Mui-selected .MuiTypography-root": {
                color: selectedTextColor,
              },
              "&.Mui-selected .MuiTypography-root:first-child": {
                fontWeight: 700,
              },
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <svg
                width="71"
                height="51"
                viewBox="0 0 71 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "1.75rem",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                <line
                  x1="58"
                  y1="1.5"
                  x2="63"
                  y2="1.5"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="57"
                  y1="0.5"
                  x2="64"
                  y2="0.5"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="69.5"
                  y1="24"
                  x2="69.5"
                  y2="29"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="70.5"
                  y1="23"
                  x2="70.5"
                  y2="30"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
                <rect
                  y="2"
                  width="69"
                  height="49"
                  fill={isLandscape ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="6"
                  y1="1.5"
                  x2="11"
                  y2="1.5"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
                <line
                  x1="5"
                  y1="0.5"
                  x2="12"
                  y2="0.5"
                  stroke={isLandscape ? selectedIconColor : boardIconColor}
                />
              </svg>

              {/* <img
                src={superBoardImg_landscape}
                style={{
                  height: "1.75rem",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              /> */}
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  pointerEvents: "none",
                  wordBreak: "break-word",
                  display: "block",
                  minHeight: "1rem",
                }}
              >
                Super Landscape
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  userSelect: "none",
                  pointerEvents: "none",
                  color: theme.palette.text.smallText,
                  display: "block",
                  minHeight: "1rem",
                }}
              >
                69 x 49
              </Typography>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* <Divider
        sx={{
          my: 0,
          borderColor: "divider",
          borderBottomWidth: 2,
          width: "100%",
        }}
      /> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.heading,
            fontSize: theme.typography.small,
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          Mode
        </Typography>
        <DarkModeToggle
          checked={theme.palette.darkModeState}
          onChange={() => {
            console.log("WORK?>?!");
            return theme.palette.toggleDarkMode((prev) => !prev);
          }}
        />
      </Box>
    </Box>
  );
};

export default Controls;
