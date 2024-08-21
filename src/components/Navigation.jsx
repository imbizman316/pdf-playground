import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation().pathname;
  console.log(location);

  const navStyle = {
    backgroundColor: "white",
    fontWeight: "bold",
    color: "black",
  };

  return (
    <nav className="navigation-container">
      {/* <Link to="/">Board</Link> */}
      <Link
        className="navigation-button"
        to="/pdf-merger"
        style={location === "/pdf-merger" ? navStyle : {}}
      >
        Merger
      </Link>
      <Link
        className="navigation-button"
        to="/pdf-converter"
        style={location === "/pdf-converter" ? navStyle : {}}
      >
        Converter
      </Link>
      <Link
        className="navigation-button"
        to="/pdf-splitter"
        style={location === "/pdf-splitter" ? navStyle : {}}
      >
        Splitter
      </Link>
    </nav>
  );
}
