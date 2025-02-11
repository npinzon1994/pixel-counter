import { Typography } from "@mui/material";

const BoardDescription = ({theme, name, size}) => {
  return (
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
        {name}
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
        {size}
      </Typography>
    </div>
  );
};

export default BoardDescription;
