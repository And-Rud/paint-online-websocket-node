import React from "react";
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";

const Main = () => {
  return (
    <div>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
};

export default Main;
