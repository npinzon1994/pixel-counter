import { createContext, useState, useCallback, useMemo } from "react";

const ColorsContext = createContext({
  colorPalette: {},
  setColorPalette: () => {},
  imagePixelData: {},
  setImagePixelData: () => {},
  lookupTableValues: [],
  setLookupTableValues: () => {},
});

export const ColorsContextProvider = ({ children }) => {
  const [colorPalette, updateColorPalette] = useState({});
  const [imagePixelData, updateImagePixelData] = useState({});
  const [lookupTableValues, updateLookupTableValues] = useState([]);

  const setColorPalette = useCallback((colors) => {
    updateColorPalette(colors);
  }, []);

  const setImagePixelData = useCallback((data) => {
    updateImagePixelData(data);
  }, []);

  const setLookupTableValues = useCallback((values) => {
    updateLookupTableValues(values);
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
    }),
    [
      colorPalette,
      setColorPalette,
      imagePixelData,
      setImagePixelData,
      lookupTableValues,
      setLookupTableValues,
    ]
  );

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
