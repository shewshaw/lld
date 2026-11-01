import { GameRepository } from "../interfaces/GameRepository.js";

export class ResetGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository
  ) {}

  async execute(gameId: string): Promise<void> {
    const game = await this.gameRepository.findById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    game.reset();

    await this.gameRepository.save(game);
  }
}