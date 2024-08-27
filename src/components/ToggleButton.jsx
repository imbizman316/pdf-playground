import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ToggleButton() {
  // const [imageOn, setImageOn] = useState(false);

  const { imageOn, setImageOn } = useContext(ThemeContext);

  console.log(imageOn);

  return (
    <div className="toggle-container">
      <div onClick={() => setImageOn(!imageOn)} className="circle-container">
        <div
          className="circle"
          style={{
            transform: imageOn ? "translate(60px)" : "translate(0)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ToggleButton;
