import { randomUUID } from "node:crypto";

import { Game } from "../../domain/models/Game.js";
import { Player } from "../../domain/models/Player.js";
import { Mark } from "../../domain/enums/Mark.js";
import { GameRepository } from "../interfaces/GameRepository.js";

export interface CreateGameInput {
  playerXName: string;
  playerOName: string;
}

export class CreateGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository
  ) {}

  async execute(input: CreateGameInput): Promise<Game> {
    const playerX = new Player(
      randomUUID(),
      input.playerXName,
      Mark.X
    );

    const playerO = new Player(
      randomUUID(),
      input.playerOName,
      Mark.O
    );

    const game = new Game(
      randomUUID(),
      [playerX, playerO]
    );

    await this.gameRepository.save(game);

    return game;
  }
}