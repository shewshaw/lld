import { GameRepository } from "../interfaces/GameRepository.js";
import { Position } from "../../domain/models/Position.js";
import { MoveResult } from "../../domain/results/MoveResult.js";

export interface MakeMoveInput {
  gameId: string;
  row: number;
  col: number;
}

export class MakeMoveUseCase {
  constructor(
    private readonly gameRepository: GameRepository
  ) {}

  async execute(input: MakeMoveInput): Promise<MoveResult> {
    const game = await this.gameRepository.findById(
      input.gameId
    );

    if (!game) {
      throw new Error("Game not found");
    }

    const position = new Position(
      input.row,
      input.col
    );

    const result = game.makeMove(position);

    if (result.success) {
      await this.gameRepository.save(game);
    }

    return result;
  }
}