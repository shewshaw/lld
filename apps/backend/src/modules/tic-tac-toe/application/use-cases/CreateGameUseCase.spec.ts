import { describe, it, expect, beforeEach } from "vitest";

import { CreateGameUseCase } from "./CreateGameUseCase.js";
import { GetGameUseCase } from "./GetGameUseCase.js";
import { MakeMoveUseCase } from "./MakeMoveUseCase.js";
import { ResetGameUseCase } from "./ResetGameUseCase.js";

import { InMemoryGameRepository } from "../../infrastructure/persistence/InMemoryGameRepository.js";

import { GameStatus } from "../../domain/enums/GameStatus.js";
import { Mark } from "../../domain/enums/Mark.js";

describe("TicTacToe Use Cases", () => {
  let repository: InMemoryGameRepository;

  let createGame: CreateGameUseCase;
  let getGame: GetGameUseCase;
  let makeMove: MakeMoveUseCase;
  let resetGame: ResetGameUseCase;

  let gameId: string;

  beforeEach(async () => {
    repository = new InMemoryGameRepository();

    createGame = new CreateGameUseCase(repository);
    getGame = new GetGameUseCase(repository);
    makeMove = new MakeMoveUseCase(repository);
    resetGame = new ResetGameUseCase(repository);

    const game = await createGame.execute({
      playerXName: "Alice",
      playerOName: "Bob",
    });

    gameId = game.getId();
  });

  it("should create and retrieve a game", async () => {
    const game = await getGame.execute(gameId);

    expect(game.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(game.getCurrentPlayer().mark).toBe(Mark.X);
  });

  it("should make a move and switch players", async () => {
    const result = await makeMove.execute({
      gameId,
      row: 0,
      col: 0,
    });

    expect(result.success).toBe(true);

    const game = await getGame.execute(gameId);

    expect(game.getCurrentPlayer().mark).toBe(Mark.O);
  });

  it("should reset a game", async () => {
    await makeMove.execute({
      gameId,
      row: 0,
      col: 0,
    });

    await resetGame.execute(gameId);

    const game = await getGame.execute(gameId);

    expect(game.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(game.getCurrentPlayer().mark).toBe(Mark.X);
  });

  it("should reject an unknown game ID", async () => {
    await expect(
      getGame.execute("unknown-game")
    ).rejects.toThrow("Game not found");
  });
});