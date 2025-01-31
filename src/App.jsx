import { useContext, useState, useEffect } from "react";
import classes from "./App.module.css";
import ColorsList from "./components/ColorsList";
import ColorsContext from "./context/colors-context";
import PixelMapper from "./components/PixelMapper";
import Controls from "./components/Controls";

function App() {
  const { colorPalette, setImagePixelData, uploadedImage } =
    useContext(ColorsContext);
  const [scrapedColors, setScrapedColors] = useState({});
  const colorsNotEmpty = Object.values(colorPalette).length > 0;

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
      {colorsNotEmpty ? (
        <ColorsList scrapedColors={scrapedColors} />
      ) : (
        <p>NO IMAGE SELECTED</p>
      )}
      <PixelMapper file={uploadedImage} />
      <Controls />
    </div>
  );
}

export default App;
