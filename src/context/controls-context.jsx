import { createContext, useState, useMemo, useCallback } from "react";

const ControlsContext = createContext({
  zoomLevel: 0,
  gridSettings: {},
  backgroundSettings: {},
  boardSize: "",
  darkMode: null,
  setZoomLevel: () => {},
  toggleGrid: () => {},
  setGridColor: () => {},
  setBackgroundColor: () => {},
  toggleBackground: () => {},
  setBoardSize: () => {},
  toggleDarkMode: () => {},
});

export const ControlsContextProvider = ({ children }) => {
  const [zoomLevel, updateZoomLevel] = useState(4);
  const [gridSettings, updateGridSettings] = useState({
    color: "#7c7b7b",
    isVisible: false,
  });
  const [backgroundSettings, updateBackgroundSettings] = useState({
    color: "#000000",
    isVisible: true,
  });
  const [boardSize, updateBoardSize] = useState("mini");
  const [darkMode, setDarkMode] = useState(true);

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

  const setBoardSize = useCallback((event) => {
    updateBoardSize(event.target.value);
  }, []);

  const setZoomLevel = useCallback((event) => {
    updateZoomLevel(+event.target.value);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const contextValue = useMemo(() => {
    return {
      zoomLevel,
      gridSettings,
      backgroundSettings,
      boardSize,
      darkMode,
      setZoomLevel,
      setGridColor,
      toggleGrid,
      setBackgroundColor,
      toggleBackground,
      setBoardSize,
      toggleDarkMode,
    };
  }, [
    zoomLevel,
    gridSettings,
    backgroundSettings,
    boardSize,
    darkMode,
    setZoomLevel,
    setBackgroundColor,
    setBoardSize,
    setGridColor,
    toggleBackground,
    toggleGrid,
    toggleDarkMode,
  ]);

  return (
    <ControlsContext.Provider value={contextValue}>
      {children}
    </ControlsContext.Provider>
  );
};

export default ControlsContext;
