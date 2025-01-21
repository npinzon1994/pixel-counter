import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorsContextProvider } from "./context/colors-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorsContextProvider>
      <App />
    </ColorsContextProvider>
  </StrictMode>
);
