export type PlayerMark = "X" | "O";

export type CellValue = PlayerMark | "EMPTY";

export type GameStatus =
  | "IN_PROGRESS"
  | "X_WON"
  | "O_WON"
  | "DRAW";

export type Board = CellValue[][];

export interface CreateGameRequest {
    playerXName: string;
    playerOName: string;
};

export interface MakeMoveRequest {
    row: number;
    col: number;
};

export interface CreateGameResponse {
    id: string;
    status: GameStatus;
    board: Board;
    currentPlayer: PlayerMark;
};

export interface MakeMoveResponse {
    success: boolean;
    status: GameStatus;
    board: Board;
    winner: PlayerMark | null;
    nextPlayer: PlayerMark | null;
};

export interface GameResponse {
    id: string;
    status: GameStatus;
    board: Board;
    currentPlayer: PlayerMark | null;
    winner: PlayerMark | null;
}