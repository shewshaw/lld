
import { GameSetup } from "../components/GameSetup";
import { GameBoard } from "../components/GameBoard";
import { useGame } from "../hooks/useGame";

export function TicTacToePage() {
  const {
    game,
    isLoading,
    error,
    createGame,
    makeMove,
    resetGame,
  } = useGame();

  async function handleStartGame(
    playerXName: string,
    playerOName: string,
  ) {
    try {
      await createGame(playerXName, playerOName);
    } catch {
      // The hook already records the error.
    }
  }

  async function handleCellClick(row: number, col: number) {
    if (!game || isLoading || game.status !== "IN_PROGRESS") {
      return;
    }

    try {
      await makeMove(game.id, { row, col });
    } catch {
      // The hook already records the error.
    }
  }

  async function handleReset() {
    if (!game) return;

    try {
      await resetGame(game.id);
    } catch {
      // The hook already records the error.
    }
  }

  if (!game) {
    return (
      <main className="game-page">
        <GameSetup
          onStart={handleStartGame}
          isSubmitting={isLoading}
        />

        {error && (
          <p className="game-error" role="alert">
            {error}
          </p>
        )}
      </main>
    );
  }

  return (
    <main className="game-page">
      <h1>Tic-Tac-Toe</h1>

      <p>
        {game.status === "IN_PROGRESS"
            ? `Current turn: Player ${game.currentPlayer}`
            : game.status === "X_WON" || game.status === "O_WON"
                ? `Winner: Player ${game.winner}`
                : "It's a draw!"}
      </p>

      <GameBoard
        board={game.board}
        onCellClick={handleCellClick}
        disabled={isLoading || game.status !== "IN_PROGRESS"}
      />

      {error && (
        <p className="game-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="game-setup__button"
        onClick={handleReset}
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Reset Game"}
      </button>
    </main>
  );
}
