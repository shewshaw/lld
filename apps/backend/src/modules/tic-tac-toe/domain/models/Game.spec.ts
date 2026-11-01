import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { Mark } from "../enums/Mark.js";
import { GameStatus } from "../enums/GameStatus.js";
import { Position } from "./Position.js";

describe("TicTacToe Game", () => {
  let game: Game;

  beforeEach(() => {
    const alice = new Player("1", "Alice", Mark.X);
    const bob = new Player("2", "Bob", Mark.O);

    game = new Game("game-1", [alice, bob]);
  });

  it("should start with X player", () => {
    expect(game.getCurrentPlayer().mark).toBe(Mark.X);
    expect(game.getStatus()).toBe(GameStatus.IN_PROGRESS);
  });

  it("should switch turns after a valid move", () => {
    game.makeMove(new Position(0, 0));

    expect(game.getCurrentPlayer().mark).toBe(Mark.O);
  });

  it("should reject an occupied cell", () => {
    game.makeMove(new Position(0, 0));

    const result = game.makeMove(new Position(0, 0));

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.message).toBe("Cell is already occupied");
    }
  });

  it("should declare X as winner", () => {
    game.makeMove(new Position(0, 0)); // X
    game.makeMove(new Position(1, 0)); // O
    game.makeMove(new Position(0, 1)); // X
    game.makeMove(new Position(1, 1)); // O

    const result = game.makeMove(new Position(0, 2)); // X

    expect(result.success).toBe(true);
    expect(game.getStatus()).toBe(GameStatus.X_WON);
    expect(game.getWinner()?.name).toBe("Alice");
  });

  it("should not allow moves after game finishes", () => {
    game.makeMove(new Position(0, 0));
    game.makeMove(new Position(1, 0));
    game.makeMove(new Position(0, 1));
    game.makeMove(new Position(1, 1));
    game.makeMove(new Position(0, 2));

    const result = game.makeMove(new Position(2, 2));

    expect(result.success).toBe(false);
  });

  it("should reset the game", () => {
    game.makeMove(new Position(0, 0));
    game.makeMove(new Position(1, 0));

    game.reset();

    expect(game.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(game.getCurrentPlayer().mark).toBe(Mark.X);
    expect(game.getBoard().flat().every(
      cell => cell === Mark.EMPTY
    )).toBe(true);
  });
});