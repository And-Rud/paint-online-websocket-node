import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Erase from "../tools/Erase";
import Line from "../tools/Line";

const Toolbar = () => {
  const changeColor = (e) => {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    console.log(dataUrl);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionId + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn bsq"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn wcr"
        onClick={() =>
          toolState.setTool(
            new Circle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn erase"
        onClick={() => toolState.setTool(new Erase(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn bln"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></button>
      <input
        onChange={(e) => changeColor(e)}
        type="color"
        style={{ marginLeft: 10 }}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      ></button>
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      ></button>
      <button className="toolbar__btn save" onClick={() => download()}></button>
    </div>
  );
};

export default Toolbar;
