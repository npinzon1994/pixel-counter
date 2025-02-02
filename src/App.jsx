import { useContext, useState, useEffect } from "react";
import classes from "./App.module.css";
import ColorsList from "./components/ColorsList";
import ColorsContext from "./context/colors-context";
import PixelMapper from "./components/PixelMapper";
import Controls from "./components/Controls/Controls"

function App() {
  const { colorPalette, setImagePixelData } = useContext(ColorsContext);
  const colorsNotEmpty = Object.values(colorPalette).length > 0;
  const [scrapedColors, setScrapedColors] = useState({});

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
  }, [setImagePixelData]);

  useEffect(() => {
    console.log("Scraped Colors: ", scrapedColors);
  }, [scrapedColors]);

  return (
    <div id={classes["main-wrapper"]}>
      <Controls />
      <PixelMapper />
      {colorsNotEmpty ? (
        <ColorsList scrapedColors={scrapedColors} />
      ) : (
        <p>NO IMAGE SELECTED</p>
      )}
    </div>
  );
}

export default App;
