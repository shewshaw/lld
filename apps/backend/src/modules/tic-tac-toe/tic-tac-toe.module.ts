import { Module } from "@nestjs/common";

import { GAME_REPOSITORY } from "./application/interfaces/GameRepositoryToken.js";
import { GameRepository } from "./application/interfaces/GameRepository.js";

import { InMemoryGameRepository } from "./infrastructure/persistence/InMemoryGameRepository.js";

import { CreateGameUseCase } from "./application/use-cases/CreateGameUseCase.js";
import { MakeMoveUseCase } from "./application/use-cases/MakeMoveUseCase.js";
import { GetGameUseCase } from "./application/use-cases/GetGameUseCase.js";
import { ResetGameUseCase } from "./application/use-cases/ResetGameUseCase.js";

import { GameController } from "./presentation/controllers/GameController.js";

@Module({
    controllers: [GameController],
    providers: [
        {
        provide: GAME_REPOSITORY,
        useClass: InMemoryGameRepository,
        },

        {
        provide: CreateGameUseCase,
        useFactory: (repository: GameRepository) =>
            new CreateGameUseCase(repository),
        inject: [GAME_REPOSITORY],
        },

        {
        provide: MakeMoveUseCase,
        useFactory: (repository: GameRepository) =>
            new MakeMoveUseCase(repository),
        inject: [GAME_REPOSITORY],
        },

        {
        provide: GetGameUseCase,
        useFactory: (repository: GameRepository) =>
            new GetGameUseCase(repository),
        inject: [GAME_REPOSITORY],
        },

        {
        provide: ResetGameUseCase,
        useFactory: (repository: GameRepository) =>
            new ResetGameUseCase(repository),
        inject: [GAME_REPOSITORY],
        },
    ],
    exports: [
        CreateGameUseCase,
        MakeMoveUseCase,
        GetGameUseCase,
        ResetGameUseCase, 
    ],
})
export class TicTacToeModule {}