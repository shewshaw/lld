import { Game } from "../../domain/models/Game.js";
import { GameRepository } from "../interfaces/GameRepository.js";

export class GetGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository
  ) {}

  async execute(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    return game;
  }
}