export class Position {
    constructor(
        public readonly row: number,
        public readonly col: number,
    ) {
        if(!Number.isInteger(row) || !Number.isInteger(col)) {
            throw new Error("Row and column must be integers.");
        }
    }

    equlas(other: Position): boolean {
        return this.row === other.row && this.col === other.col;
    }
}