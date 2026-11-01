
import { useState } from "react";

import { gameApi } from "../services/gameApi";
import type {
  CreateGameResponse,
  GameResponse,
  MakeMoveRequest,
} from "../types/game.types";

export function useGame() {
  const [game, setGame] = useState<GameResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleError(error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    setError(message);
  }

  async function createGame(
    playerXName: string,
    playerOName: string,
  ): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const response: CreateGameResponse =
        await gameApi.createGame({
          playerXName,
          playerOName,
        });

      setGame({
        ...response,
        currentPlayer: response.currentPlayer,
        winner: null,
      });
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function makeMove(
    gameId: string,
    move: MakeMoveRequest,
  ): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const response = await gameApi.makeMove(gameId, move);

      setGame((currentGame) => {
        if (!currentGame) {
          return currentGame;
        }

        return {
          ...currentGame,
          board: response.board,
          status: response.status,
          winner: response.winner,
          currentPlayer: response.nextPlayer,
        };
      });
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function resetGame(gameId: string): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      await gameApi.resetGame(gameId);

      // The reset endpoint returns a message, not the updated game.
      // Fetch the game again to get the authoritative state.
      const response = await gameApi.getGame(gameId);

      setGame(response);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    game,
    isLoading,
    error,
    createGame,
    makeMove,
    resetGame,
  };
}
