import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;

  constructor() {
    //ця функція відслідковує зміни і перерендерює компоненти
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor = color;
  }
  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }
  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ToolState();
