import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  NotFoundException,
} from "@nestjs/common";

import { CreateGameUseCase } from "../../application/use-cases/CreateGameUseCase.js";
import { MakeMoveUseCase } from "../../application/use-cases/MakeMoveUseCase.js";
import { GetGameUseCase } from "../../application/use-cases/GetGameUseCase.js";
import { ResetGameUseCase } from "../../application/use-cases/ResetGameUseCase.js";

import { GameNotFoundError } from "../../application/errors/GameNotFoundError.js";

import { CreateGameDto } from "../dto/CreateGameDto.js";
import { MakeMoveDto } from "../dto/MakeMoveDto.js";

@Controller("games")
export class GameController {
  constructor(
    private readonly createGameUseCase: CreateGameUseCase,
    private readonly makeMoveUseCase: MakeMoveUseCase,
    private readonly getGameUseCase: GetGameUseCase,
    private readonly resetGameUseCase: ResetGameUseCase,
  ) {}

  @Post()
  async createGame(@Body() dto: CreateGameDto) {
    try {
      const game = await this.createGameUseCase.execute(dto);

      return {
        id: game.getId(),
        status: game.getStatus(),
        board: game.getBoard(),
        currentPlayer: game.getCurrentPlayer().mark,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(":id")
  async getGame(@Param("id") id: string) {
    try {
      const game = await this.getGameUseCase.execute(id);

      return {
        id: game.getId(),
        status: game.getStatus(),
        board: game.getBoard(),
        currentPlayer: game.getCurrentPlayer().mark,
        winner: game.getWinner()?.mark ?? null,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Post(":id/moves")
  async makeMove(
    @Param("id") id: string,
    @Body() dto: MakeMoveDto,
  ) {
    try {
      return await this.makeMoveUseCase.execute({
        gameId: id,
        row: dto.row,
        col: dto.col,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Post(":id/reset")
  @HttpCode(HttpStatus.OK)
  async resetGame(@Param("id") id: string) {
    try {
      await this.resetGameUseCase.execute(id);

      return {
        message: "Game reset successfully",
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private mapError(error: unknown): Error {
    if (error instanceof GameNotFoundError) {
      return new NotFoundException(error.message);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error("Unexpected error");
  }
}