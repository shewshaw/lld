
import type { Board } from "../types/game.types";

interface GameBoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  disabled?: boolean;
}

export function GameBoard({
  board,
  onCellClick,
  disabled = false,
}: GameBoardProps) {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isEmpty = cell === "EMPTY";

          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              className={`game-board__cell ${
                cell !== "EMPTY"
                  ? `game-board__cell--${cell.toLowerCase()}`
                  : ""
              }`}
              disabled={disabled || !isEmpty}
              onClick={() => onCellClick(rowIndex, colIndex)}
              aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${
                isEmpty ? "empty" : cell
              }`}
            >
              {isEmpty ? "" : cell}
            </button>
          );
        }),
      )}
    </div>
  );
}
