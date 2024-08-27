import Board from "./components/Board";
import "./App.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import PdfMerger from "./components/pdf/PdfMerger";
import Navigation from "./components/Navigation";
import PdfConverter from "./components/pdf/PdfConverter";
import PdfSplitter from "./components/pdf/PdfSplitter";
import ToggleButton from "./components/ToggleButton";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { imageOn } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div
        className="body"
        style={{
          backgroundImage: imageOn
            ? 'url("https://i.imgur.com/R2KAgcH.jpeg")'
            : "none",
          backgroundColor: imageOn ? "transparent" : "white", // Default color when image is off
        }}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/pdf-merger" element={<PdfMerger />} />
          <Route path="/pdf-converter" element={<PdfConverter />} />
          <Route path="/pdf-splitter" element={<PdfSplitter />} />
        </Routes>
        <ToggleButton />
      </div>
    </BrowserRouter>
  );
}

export default App;

//1. I will make 50 X 50 board.
