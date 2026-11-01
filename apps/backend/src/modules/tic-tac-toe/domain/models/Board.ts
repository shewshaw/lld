import { Mark }  from "../enums/Mark.js";
import { Position } from "../models/Position.js";

export class Board {
    private static readonly SIZE = 3;
    private cells: Mark[][];

    constructor() {
        this.cells = this.createEmptyBoard();
    }

    createEmptyBoard(): Mark[][] {
        // return Array.from({ length: Board.SIZE }, () =>
        //     Array<Mark>(Board.SIZE).fill(Mark.EMPTY)
        // );
        const board: Mark[][] = new Array(Board.SIZE);
        for (let i = 0; i < Board.SIZE; i++) {
            board[i] = Array<Mark>(Board.SIZE).fill(Mark.EMPTY);
        }
        return board;
    }

    isPositionValid(position: Position): boolean {
        return (
            position.row >= 0 &&
            position.row < Board.SIZE &&
            position.col >= 0 &&
            position.col < Board.SIZE
        )
    }

    isCellEmpty(position: Position): boolean {
        if(!this.isPositionValid(position)) {
            return false;
        }
        return this.cells[position.row][position.col] === Mark.EMPTY;
    }

    placeMark(position: Position, mark: Mark): void {
        if(!this.isPositionValid(position)) {
            throw new Error("Invalid Board position.");
        }
        if(mark === Mark.EMPTY) {
            throw new Error("Cannot place Empty mark.");
        }
        if(!this.isCellEmpty(position)) {
            throw new Error("Cell is already occupied.");
        }

        this.cells[position.row][position.col] = mark;
    }

    getWinner(): Mark | null {
        
        // checking rows
        for(let row = 0; row < Board.SIZE; row++) {
            const first = this.cells[row][0];
            if(
                first !== Mark.EMPTY &&
                this.cells[row][1] === first &&
                this.cells[row][2] === first
            ) {
                return first;
            }
        }

        // checking cols
        for(let col = 0; col < Board.SIZE; col++) {
            const first = this.cells[0][col];
            if(
                first !== Mark.EMPTY &&
                this.cells[1][col] === first &&
                this.cells[2][col] === first
            ) {
                return first;
            }
        }

        const center = this.cells[1][1];
        // Main diagonal
        if (
            center !== Mark.EMPTY &&
            center === this.cells[0][0] &&
            center === this.cells[2][2]
        ) {
            return center;
        }
        // Anti-diagonal
        if (
            center !== Mark.EMPTY &&
            center === this.cells[0][2] &&
            center === this.cells[2][0]
        ) {
            return center;
        }

        return null;
    }

    isFull(): boolean {
        // return this.cells.every(row =>
        //     row.every(cell => cell !== Mark.EMPTY)
        // );
        for (let row = 0; row < this.cells.length; row++) {
            for (let col = 0; col < this.cells[row].length; col++) {
                if (this.cells[row][col] === Mark.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    getCells(): Mark[][] {
        // return this.cells.map(row => [...row]);
        const cells: Mark[][] = [];
        for (let i = 0; i < this.cells.length; i++) {
            cells.push([...this.cells[i]]);
        }
        return cells;
    }

    reset(): void {
        this.cells = this.createEmptyBoard();
    }

}