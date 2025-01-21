import { createContext, useState, useCallback } from "react";

const ColorsContext = createContext({
  colors: {},
  addPixel: () => {},
  clearList: () => {},
});

export const ColorsContextProvider = ({ children }) => {
  const [colors, setColors] = useState({});

  const addPixel = useCallback((colorKey) => {
    setColors((prev) => {
      return { ...prev, [colorKey]: (prev[colorKey] || 0) + 1 };
    });
  }, []);

  const clearList = useCallback(() => {
    setColors({});
  }, []);

  return (
    <ColorsContext.Provider value={{ colors, addPixel, clearList }}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
