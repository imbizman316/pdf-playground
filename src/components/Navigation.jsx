import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation().pathname;
  console.log(location);

  if (location === "/pdf-merger") {
  }

  return (
    <nav className="navigation-container">
      {/* <Link to="/">Board</Link> */}
      <Link className="navigation-button" to="/pdf-merger">
        PDF Merger
      </Link>
      <Link className="navigation-button" to="/pdf-converter">
        PDF Converter
      </Link>
      <Link className="navigation-button" to="/pdf-splitter">
        PDF Splitter
      </Link>
    </nav>
  );
}
