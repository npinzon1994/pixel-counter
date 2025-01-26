import { createContext, useState, useCallback } from "react";

const ColorsContext = createContext({
  capturedColors: {},
  setCapturedColors: () => {},
  colorPalette: {},
  setColorPalette: () => {},
  clearList: () => {},
});

export const ColorsContextProvider = ({ children }) => {
  const [capturedColors, setOriginalColors] = useState({});
  const [colorPalette, updateColorPalette] = useState({});

  const setCapturedColors = useCallback((colors) => {
    setOriginalColors(colors);
  }, []);

  const clearList = useCallback(() => {
    setOriginalColors({});
  }, []);

  const setColorPalette = useCallback((colors) => {
    updateColorPalette(colors);
  }, []);

  return (
    <ColorsContext.Provider
      value={{
        capturedColors,
        setCapturedColors,
        colorPalette,
        setColorPalette,
        clearList,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
