import Tool from "./Tools";

export default class Erase extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  //фя слухач запуск в констрб додає слухачів на наш конвас, після створення обєкта рраш конвас буде слухати всі ці функції
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  //слухач відпускання миші
  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  //слухач нажимання
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    this.ctx.strokeStyle = "white";
  }

  //слухач руху миші, якщо кнопка нажата, то малюємо
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    // eslint-disable-next-line no-undef
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
