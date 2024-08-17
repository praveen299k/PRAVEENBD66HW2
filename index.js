let { getAllGames, getGameById } = require("./controllers");
let express = require("express");
let cors = require("cors");

let app = express();

// Endpoint: Get all games
app.get("/games", async (req, res) => {
  let games = getAllGames();
  res.status(200).json({ games });
});

// Endpoint: Get game by ID
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  res.status(200).json({ game });
});

app.use(cors());
app.use(express.json());

module.exports = { app };
