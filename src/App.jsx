import { useContext, useEffect } from "react";
import classes from "./App.module.css";
import ColorsContext from "./context/colors-context";
import PixelMapper from "./components/PixelMapper";
import Controls from "./components/Controls/Controls";
import ColorsPanel from "./components/Colors/ColorsPanel";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import ControlsContext from "./context/controls-context";

function App() {
  const { setImagePixelData, scrapedColors, setScrapedColors } =
    useContext(ColorsContext);
  const { darkMode } = useContext(ControlsContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "rgb(59, 104, 255)", //main shade of primary color
        translucent: "rgba(59, 104, 255, 0.7)",
      },
      background: {
        default: darkMode ? "#1a1a1a" : "#e0e0e0", //primary bg color
        paper: darkMode ? "#242424" : "#ffffff", //secondary bg color
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
    typography: {
      fontFamily: "Nunito Sans, serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: "#3b68ff",
          },
        },
      },
    },
  });

  //scraping colors on first load
  useEffect(() => {
    fetch("http://localhost:5000/api/colors")
      .then((response) => response.json())
      .then((data) => setScrapedColors(data))
      .catch((error) => console.error("Error fetching colors:", error));

    //grabbing default image
    fetch("http://localhost:5000/api/default-image")
      .then((response) => response.json())
      .then((data) => setImagePixelData(data))
      .catch((error) => console.error("Error fetching colors:", error));
  }, [setImagePixelData, setScrapedColors]);

  useEffect(() => {
    console.log("Scraped Colors: ", scrapedColors);
  }, [scrapedColors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
            margin: 0,
            padding: 0,
            fontFamily: theme.typography.fontFamily,
          },
          main: {
            backgroundColor: theme.palette.background.paper,
          },
          "::-webkit-scrollbar": {
            width: "8px", // width of the scrollbar
            height: "8px", // height of horizontal scrollbar
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: darkMode ? "#333" : "#e0e0e0", // color of scrollbar track
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main, // color of the scrollbar thumb
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.dark, // thumb color on hover
          },
          "::-webkit-scrollbar-button": {
            display: "none", // optional: hide scroll buttons (arrows)
          },
        })}
      />
      <div id={classes["main-wrapper"]}>
        <Controls />
        <PixelMapper />
        <ColorsPanel />
      </div>
    </ThemeProvider>
  );
}

export default App;
