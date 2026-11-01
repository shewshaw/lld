import { Board } from "./Board.js";
import { Player } from "./Player.js";
import { Position } from "./Position.js";

import { GameStatus } from "../enums/GameStatus.js";
import { Mark } from "../enums/Mark.js";

import { MoveResult } from "../results/MoveResult.js";

export class Game {
    private readonly board: Board;
    private readonly players: Player[];

    private currentPlayer: Player;
    private status: GameStatus;
    private winner: Player | null;

    constructor(
        private readonly id: string,
        players:Player[]
    ) {
        if(!id.trim()) {
            throw new Error("Game Id cannot be empty.");
        }

        this.validatePlayers(players);

        this.players = [...players];
        this.board = new Board();

        this.currentPlayer = this.players.find(
            player => player.mark === Mark.X
        )!;

        this.status = GameStatus.IN_PROGRESS;
    }

    private validatePlayers(players: Player[]): void {
        if(players.length !== 2) {
            throw new Error("Exactly two players are required.");
        }

        const ids = players.map(player => player.id);
        const marks = players.map(player => player.mark);

        if(new Set(ids).size !== 2) {
            throw new Error("Player ids must be unique.");
        }

        if(new Set(marks).size !== 2 || !marks.includes(Mark.X) || !marks.includes(Mark.O)) {
            throw new Error("Players must have unique X and O marks.");
        }
    }

    makeMove(position: Position): MoveResult {
        if(this.status !== GameStatus.IN_PROGRESS) {
            return this.failure(`Game has already finished.`);
        }

        if(!this.board.isPositionValid(position)) {
            return this.failure(`Invalid board position.`);
        }

        if(!this.board.isCellEmpty(position)) {
            return this.failure("Cell is already occupied");
        }

        this.board.placeMark(position,this.currentPlayer.mark);

        const winningMark = this.board.getWinner();
        if(winningMark !== null) {
            this.winner = this.players.find(
                player => player.mark === winningMark
            )!;

            this.status = winningMark === Mark.X ? GameStatus.X_WON : GameStatus.O_WON;

            return this.success();
        }

        if(this.board.isFull()) {
            this.status = GameStatus.DRAW;

            return this.success();
        }

        this.switchPlayer();
        return this.success();
    }

    private switchPlayer(): void {
        this.currentPlayer = this.players.find(
            player => player.id !== this.currentPlayer.id
        )!;
    }

    private success(): MoveResult {
        return {
        success: true,
        status: this.status,
        board: this.board.getCells(),
        winner: this.winner?.mark ?? null,
        nextPlayer:
            this.status === GameStatus.IN_PROGRESS
            ? this.currentPlayer.mark
            : null,
        };
    }

    private failure(message: string): MoveResult {
        return {
            success: false,
            message: message,
            board: this.board.getCells(),
            status: this.status
        }
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    getStatus(): GameStatus {
        return this.status;
    }

    getWinner(): Player | null {
        return this.winner;
    }

    getBoard(): Mark[][] {
        return this.board.getCells();
    }

    getId(): string {
        return this.id;
    }

    reset(): void {
        this.board.reset();

        this.currentPlayer = this.players.find(
            player => player.mark === Mark.X
        )!;

        this.status = GameStatus.IN_PROGRESS;
        this.winner = null;
    }
}