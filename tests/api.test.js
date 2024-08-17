let { getAllGames } = require("../controllers");
let { app } = require("../index");
let request = require("supertest");
let http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controllers function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all games", () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    let res = getAllGames();

    expect(res).toEqual(mockGames);
    expect(res.length).toBe(3);
  });
});

describe("API Endpoints", () => {
  it("GET /games endpoint successfully retrieves all game records.", async () => {
    let res = await request(server).get("/games");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    });
    expect(res.body.games.length).toBe(3);
  });

  it("GET /games/details/:id endpoint successfully retrieves a specific game record by ID.", async () => {
    let res = await request(server).get("/games/details/3");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    });
  });
});
