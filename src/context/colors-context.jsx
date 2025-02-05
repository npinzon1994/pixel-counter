import { createContext, useState, useCallback, useMemo } from "react";

const ColorsContext = createContext({
  colorPalette: {},
  setColorPalette: () => {},
  imagePixelData: {},
  setImagePixelData: () => {},
  lookupTableValues: [],
  setLookupTableValues: () => {},
  uploadedImage: null,
  setUploadedImage: () => {},
  scrapedColors: [],
  setScrapedColors: () => {},
  highlightedPixels: {},
  setHighlightedPixels: () => {},
});

export const ColorsContextProvider = ({ children }) => {
  const [colorPalette, updateColorPalette] = useState({});
  const [imagePixelData, updateImagePixelData] = useState({});
  const [lookupTableValues, updateLookupTableValues] = useState([]);
  const [uploadedImage, updateUploadedImage] = useState(null);
  const [scrapedColors, updateScrapedColors] = useState({});
  const [highlightedColor, setHighlightedColor] = useState({});

  const setColorPalette = useCallback((colors) => {
    updateColorPalette(colors);
  }, []);

  const setImagePixelData = useCallback((data) => {
    updateImagePixelData(data);
  }, []);

  const setLookupTableValues = useCallback((values) => {
    updateLookupTableValues(values);
  }, []);

  const setUploadedImage = useCallback((file) => {
    updateUploadedImage(file);
  }, []);

  const setScrapedColors = useCallback((colors) => {
    updateScrapedColors(colors);
  }, []);

  /**
   * useMemo ensures different states can be independently
   * updated without causing unnecessary re-renders to all
   * consuming components
   */
  const contextValue = useMemo(
    () => ({
      colorPalette,
      setColorPalette,
      imagePixelData,
      setImagePixelData,
      lookupTableValues,
      setLookupTableValues,
      uploadedImage,
      setUploadedImage,
      scrapedColors,
      setScrapedColors,
      highlightedColor,
      setHighlightedColor,
    }),
    [
      colorPalette,
      setColorPalette,
      imagePixelData,
      setImagePixelData,
      lookupTableValues,
      setLookupTableValues,
      uploadedImage,
      setUploadedImage,
      scrapedColors,
      setScrapedColors,
      highlightedColor,
      setHighlightedColor,
    ]
  );

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
