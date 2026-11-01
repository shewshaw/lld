import { Mark } from "../enums/Mark.js";

export class Player {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly mark: Mark,
    ) {
        if(!id.trim()) {
            throw new Error("Player ID cannot be empty.");
        }
        if(!name.trim()) {
            throw new Error("Player name cannot be empty.");
        }
        if(mark === Mark.EMPTY) {
            throw new Error("Player cannot have empty mark.");
        }
    }
}