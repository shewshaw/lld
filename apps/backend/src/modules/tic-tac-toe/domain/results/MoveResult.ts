import { GameStatus } from "../enums/GameStatus.js";
import { Mark } from "../enums/Mark.js";

export type MoveResult = 
| {
    success: true;
    board: Mark[][];
    status: GameStatus;
    winner: Mark | null;
    nextPlayer: Mark | null;
} |
{
    success: false;
    message: string;
    board: Mark[][];
    status: GameStatus;
};