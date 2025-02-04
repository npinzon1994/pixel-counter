import ColorsContext from "../../context/colors-context";
import ControlsContext from "../../context/controls-context";
import classes from "./Controls.module.css";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import Slider from "@mui/material/Slider";
import ColorPicker from "./ColorPicker";
import logo from "../../assets/logo.svg";
import miniBoardImg from "../../assets/mini-pegboard.svg";
import largeBoardImg from "../../assets/large-pegboard.svg";
import superBoardImg_portrait from "../../assets/super-pegboard-portrait.svg";
import superBoardImg_landscape from "../../assets/super-pegboard-landscape.svg";
import {
  Switch,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { DarkMode, LightMode } from "@mui/icons-material";

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
    zoomLevel,
    boardSize,
    setZoomLevel,
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
      <Divider
        sx={{
          my: 0,
          borderColor: "divider",
          borderBottomWidth: 2,
          width: "100%",
        }}
      />

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
        <Slider
          value={zoomLevel}
          min={1}
          max={40}
          step={0.1}
          size="small"
          onChange={setZoomLevel}
          sx={{ width: "100%", maxWidth: "7.25rem" }}
        />
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
          onChange={setBoardSize}
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
              // padding: 1
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1.75rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={miniBoardImg}
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
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  display: "block",
                  minHeight: "1rem",
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
              // padding: 1
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "10rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={largeBoardImg}
                style={{
                  // width: "100%",
                  // maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
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
              // paddingBlock: 2.5
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={superBoardImg_portrait}
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
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
                  wordBreak: "break-word",
                  display: "block",
                  minHeight: "1rem",
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
              // paddingBlock: 2.5
            }}
          >
            <div
              style={{
                // width: "100%",
                // maxWidth: "10rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={superBoardImg_landscape}
                style={{
                  // width: "100%",
                  // maxWidth: "100%",
                  height: "1.75rem",
                  display: "block",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  userSelect: "none",
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
        <DarkModeToggle checked={theme.palette.mode} onChange={theme.palette.toggleDarkMode} />
      </Box>
    </Box>
  );
};

export default Controls;
