import { useContext, useState, useEffect } from "react";
import "./App.css";
import ColorsList from "./components/ColorsList";
import ImageUploader from "./components/ImageUploader";
import ColorsContext from "./context/colors-context";

function App() {
  const { colorPalette } = useContext(ColorsContext);
  const [scrapedColors, setScrapedColors] = useState({});
  const colorsNotEmpty = Object.values(colorPalette).length > 0;

  //scraping colors on first load
  useEffect(() => {
    fetch("http://localhost:5000/api/colors")
      .then((response) => response.json())
      .then((data) => setScrapedColors(data))
      .catch((error) => console.error("Error fetching colors:", error));
  }, []);

  useEffect(() => {
    console.log("Scraped Colors: ", scrapedColors);
  }, [scrapedColors]);

  return (
    <>
      <h1>PIXEL COUNTER</h1>
      <ImageUploader />
      {colorsNotEmpty ? (
        <ColorsList scrapedColors={scrapedColors} />
      ) : (
        <p>NO IMAGE SELECTED</p>
      )}
    </>
  );
}

export default App;
