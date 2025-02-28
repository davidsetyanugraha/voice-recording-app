import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root: Root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
