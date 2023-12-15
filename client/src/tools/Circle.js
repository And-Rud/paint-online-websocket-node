import Tool from "./Tools";

export default class Circle extends Tool {
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
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "circle",
          x: this.startX,
          y: this.startY,
          radius: this.radius,
          color: this.ctx.fillStyle,
        },
      })
    );
  }

  //слухач нажимання
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    //кожгий раз при нажимання миші будемо зберігати зображення з канвасу
    this.saved = this.canvas.toDataURL();
  }

  //слухач руху миші, якщо кнопка нажата, то малюємо
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      this.radius = Math.abs(currentX - this.startX);
      this.draw(this.startX, this.startY, this.radius);
    }
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      //очишуємо конвас
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //лишаємо збережені малюнки
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      //далі малюємо нову фігуру
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
