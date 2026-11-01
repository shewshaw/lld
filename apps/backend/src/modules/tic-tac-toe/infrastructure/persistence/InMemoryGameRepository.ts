import { Game } from "../../domain/models/Game.js";
import { GameRepository } from "../../application/interfaces/GameRepository.js";

export class InMemoryGameRepository implements GameRepository {
  private readonly games = new Map<string, Game>();

  async save(game: Game): Promise<void> {
    this.games.set(game.getId(), game);
  }

  async findById(id: string): Promise<Game | null> {
    return this.games.get(id) ?? null;
  }
}