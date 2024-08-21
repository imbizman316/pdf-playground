import Board from "./components/Board";
import "./App.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import PdfMerger from "./components/pdf/PdfMerger";
import Navigation from "./components/Navigation";
import PdfConverter from "./components/pdf/PdfConverter";
import PdfSplitter from "./components/pdf/PdfSplitter";

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <Navigation />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/pdf-merger" element={<PdfMerger />} />
          <Route path="/pdf-converter" element={<PdfConverter />} />
          <Route path="/pdf-splitter" element={<PdfSplitter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

//1. I will make 50 X 50 board.
