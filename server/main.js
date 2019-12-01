import express from "express";
import cors from "cors";
import bp from "body-parser";
import DbContext from "./db/dbConfig";
import DragonController from "./controllers/DragonController";
import ChampionController from "./controllers/ChampionController";
import GameController from "./controllers/GameController";

const port = process.env.PORT || 3000;
let server = express();
DbContext.connect();

const whitelist = ["http://localhost:8080"];
const corsOptions = {
  origin: function(origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));
server.use(bp.urlencoded({ extended: true }));
server.use(bp.json());

server.use("/api/dragons", new DragonController().router);
server.use("/api/champions", new ChampionController().router);
server.use("/api/games", new GameController().router);

server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

server.use((req, res, next) => {
  res.status(404).send("Route not found");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
