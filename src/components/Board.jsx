import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Board() {
  const [leadingPieceX, setLeadingPieceX] = useState(0);
  const [leadingPieceY, setLeadingPieceY] = useState(2);

  const [tailX, setTailX] = useState(3);
  const [tailY, setTailY] = useState(3);

  const [direction, setDirection] = useState("right");
  const [playBoard, setPlayBoard] = useState([]);
  const vertical = 10;
  const horizontal = 10;

  const movePiece = () => {
    if (direction === "right") {
      setLeadingPieceX((prev) => (prev < vertical - 1 ? prev + 1 : prev));
    }

    if (direction === "left") {
      setLeadingPieceX((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (direction === "up") {
      setLeadingPieceY((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (direction === "down") {
      setLeadingPieceY((prev) => (prev < horizontal - 1 ? prev + 1 : prev));
    }
  };

  const placeTail = () => {};

  useEffect(() => {
    setPlayBoard(drawBoard());

    window.addEventListener("keydown", handleKeyEvent);

    const intervalId = setInterval(movePiece, 120);

    const tail = setInterval(placeTail, 3000);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      clearInterval(intervalId);
      clearInterval(tail);
    };
  }, [direction]);

  useEffect(() => {
    const addTail = () => {
      console.log("JACK POT!!!!");
    };

    if (`${leadingPieceX}${leadingPieceY}` === `${tailX}${tailY}`) {
      addTail();
    }

    const newBoard = drawBoard();
    setPlayBoard(newBoard);
  }, [leadingPieceX, leadingPieceY]);

  const handleKeyEvent = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      default:
        setDirection("right");
        break;
    }
  };

  const drawBoard = () => {
    const board = [];

    for (let i = 0; i < horizontal; i++) {
      const line = [];

      for (let j = 0; j < vertical; j++) {
        let idToUse = `${i}${j}`;

        line.push({
          id: idToUse,
          addTail: idToUse === `${tailX}${tailY}` ? true : false,
          isSelected:
            idToUse === `${leadingPieceX}${leadingPieceY}` ? true : false,
        });
      }
      board.push(line);
    }
    return board;
  };

  return (
    <div className="boardContainer">
      <h1 className="direction">{direction}</h1>
      {playBoard?.map((lines, index) => (
        <div key={index}>
          {lines?.map((line) => {
            const pieceStyle = {
              backgroundColor: "white", // Default color
              ...(line.isSelected && { backgroundColor: "gray" }), // Override if selected
              ...(line.addTail && { backgroundColor: "red" }), // Override if tail
            };

            return (
              <div className="piece" key={line.id} style={pieceStyle}>
                <h5 className="pieceId">{line.id}</h5>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
