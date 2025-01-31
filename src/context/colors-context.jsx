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
});

export const ColorsContextProvider = ({ children }) => {
  const [colorPalette, updateColorPalette] = useState({});
  const [imagePixelData, updateImagePixelData] = useState({});
  const [lookupTableValues, updateLookupTableValues] = useState([]);
  const [uploadedImage, updateUploadedImage] = useState(null);

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
    ]
  );

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
