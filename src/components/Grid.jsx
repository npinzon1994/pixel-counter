import { useContext } from "react";
import ColorsContext from "../context/colors-context";
import classes from "./Grid.module.css";
import ControlsContext from "../context/controls-context";

function setBoard(boardSize) {
  const board = { width: 0, height: 0 };
  switch (boardSize) {
    case "mini": {
      board.width = 28;
      board.height = 28;
      break;
    }
    case "large": {
      board.width = 29;
      board.height = 29;
      break;
    }
    case "super-portrait": {
      board.width = 49;
      board.height = 69;
      break;
    }
    case "super-landscape": {
      board.width = 69;
      board.height = 49;
      break;
    }
  }
  return board;
}

function setHorizontalLines(width, height, board, color) {
  const gridLines = [];
  for (let i = 0; i <= height; i++) {
    const atEdge = i % board.height === 0;
    const strokeWidth = atEdge ? 0.45 : 0.15;
    const line = (
      <line
        key={`h-${i}`}
        x1={0}
        y1={i}
        x2={width + 1}
        y2={i}
        strokeWidth={strokeWidth}
        stroke={color}
      />
    );
    gridLines.push(line);
  }
  return gridLines;
}

function setVerticalLines(width, height, board, color) {
  const gridLines = [];
  for (let i = 0; i <= width; i++) {
    const atEdge = i % board.width === 0;
    const strokeWidth = atEdge ? 0.45 : 0.15;
    const line = (
      <line
        key={`v-${i}`}
        x1={i}
        y1={0}
        x2={i}
        y2={height + 1}
        strokeWidth={strokeWidth}
        stroke={color}
      />
    );
    gridLines.push(line);
  }
  return gridLines;
}

function generateGrid(width, height, boardSize, color) {
  const board = setBoard(boardSize);
  const verticalLines = setVerticalLines(width, height, board, color);
  const horizontalLines = setHorizontalLines(width, height, board, color);
  return { vertical: verticalLines, horizontal: horizontalLines };
}

const Grid = () => {
  const { width, height } = useContext(ColorsContext);
  const { boardSize, gridSettings } = useContext(ControlsContext);
  const gridLines = generateGrid(width, height, boardSize, gridSettings.color);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={classes["grid-svg"]}>
      {gridLines.vertLines}
      {gridLines.horizLines}
    </svg>
  );
};

export default Grid;
