import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Hero from "./Hero";
import PreOp from "./PreOp";
import ScanOptIn from "./ScanOptIn";
import "./styles.css";

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route.startsWith("#/pre-op")) return <PreOp />;
  if (route.startsWith("#/scan")) return <ScanOptIn />;
  return <Hero />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
