import { Game } from "../../domain/models/Game.js";

export interface GameRepository {
  save(game: Game): Promise<void>;

  findById(id: string): Promise<Game | null>;
}