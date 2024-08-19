import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation-container">
      <Link to="/">Board</Link>
      <Link to="/pdf-merger">PDF Merger</Link>
      <Link to="/pdf-converter">PDF Converter</Link>
      <Link to="/pdf-splitter">PDF Splitter</Link>
    </nav>
  );
}
