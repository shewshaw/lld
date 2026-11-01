import { Module } from "@nestjs/common";
import { TicTacToeModule } from "./modules/tic-tac-toe/tic-tac-toe.module.js";

@Module({
  imports: [TicTacToeModule],
})
export class AppModule {}