const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const WSserver = require("express-ws")(app);
//отримуємо обєкт для широкомовної розсилкі
const aWss = WSserver.getWss();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

//створюємо запити щоб по пересиланню ссилкі було намальоване зображення
app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json({ message: "File downloaded" });
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});
app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  //в полі кліентс зберіг всі відкриті сокете на даний момент
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
