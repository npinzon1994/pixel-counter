import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import ControlsContext from "../../context/controls-context";
import { useContext, useEffect } from "react";
import BoardDescription from "./BoardDescription";

const BoardPicker = () => {
  const { boardSize, setBoardSize } = useContext(ControlsContext);
  const theme = useTheme();

  const isMini = boardSize === "mini";
  const isLarge = boardSize === "large";
  const isPortrait = boardSize === "super-portrait";
  const isLandscape = boardSize === "super-landscape";

  const boardIconColor =
    theme.palette.mode === "dark" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
  const selectedIconColor =
    theme.palette.mode === "dark" ? "#7292ff" : "#3b68ff";

  const selectedTextColor =
    theme.palette.mode === "dark" ? "#b1c2ff" : "#3b68ff";

  return (
    <Box>
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
            "&.Mui-selected .MuiTypography-root:first-of-type": {
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
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
                fill: isMini ? selectedIconColor : boardIconColor,
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
          <BoardDescription theme={theme} name="Mini" size="28 x 28" />
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
            "&.Mui-selected .MuiTypography-root:first-of-type": {
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
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "auto",
                display: "block",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
                fill: isLarge ? selectedIconColor : boardIconColor,
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
          <BoardDescription theme={theme} name="Large" size="29 x 29" />
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
            "&.Mui-selected .MuiTypography-root:first-of-type": {
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
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
                fill: isPortrait ? selectedIconColor : boardIconColor,
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
          <BoardDescription
            theme={theme}
            name="Super Portrait"
            size="49 x 69"
          />
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
            "&.Mui-selected .MuiTypography-root:first-of-type": {
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
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "1.75rem",
                display: "block",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
                fill: isLandscape ? selectedIconColor : boardIconColor,
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
          </div>
          <BoardDescription
            theme={theme}
            name="Super Landscape"
            size="69 x 49"
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default BoardPicker;
