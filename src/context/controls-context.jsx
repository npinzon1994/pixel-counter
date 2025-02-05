import { createContext, useState, useMemo, useCallback } from "react";

const ControlsContext = createContext({
  zoomLevel: 0,
  gridSettings: {},
  backgroundSettings: {},
  boardSize: "",
  setZoomLevel: () => {},
  toggleGrid: () => {},
  setGridColor: () => {},
  setBackgroundColor: () => {},
  toggleBackground: () => {},
  setBoardSize: () => {},
});

export const ControlsContextProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(4);
  const [gridSettings, updateGridSettings] = useState({
    color: "#7c7b7b",
    isVisible: false,
  });
  const [backgroundSettings, updateBackgroundSettings] = useState({
    color: "#000000",
    isVisible: true,
  });
  const [boardSize, setBoardSize] = useState("mini");

  const toggleGrid = useCallback(
    () =>
      updateGridSettings((prev) => {
        console.log("UPDATING GRID");
        return { ...prev, isVisible: !prev.isVisible };
      }),
    []
  );

  const setGridColor = useCallback((color) => {
    updateGridSettings((prev) => {
      return { ...prev, color };
    });
  }, []);

  const toggleBackground = useCallback(() => {
    updateBackgroundSettings((prev) => {
      return { ...prev, isVisible: !prev.isVisible };
    });
  }, []);

  const setBackgroundColor = useCallback((color) => {
    updateBackgroundSettings((prev) => {
      return { ...prev, color };
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      zoomLevel,
      gridSettings,
      backgroundSettings,
      boardSize,
      setZoomLevel,
      setGridColor,
      toggleGrid,
      setBackgroundColor,
      toggleBackground,
      setBoardSize,
    };
  }, [
    zoomLevel,
    gridSettings,
    backgroundSettings,
    boardSize,
    setZoomLevel,
    setBackgroundColor,
    setBoardSize,
    setGridColor,
    toggleBackground,
    toggleGrid,
  ]);

  return (
    <ControlsContext.Provider value={contextValue}>
      {children}
    </ControlsContext.Provider>
  );
};

export default ControlsContext;
