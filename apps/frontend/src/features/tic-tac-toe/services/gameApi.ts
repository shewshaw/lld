import type {
    CreateGameRequest,
    CreateGameResponse,
    GameResponse,
    MakeMoveRequest,
    MakeMoveResponse
} from "../types/game.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if(!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
            errorBody?.message ?? `Request failed: ${response.status}`,
        );
    }

    return response.json() as Promise<T>;
}

export const gameApi = {
    createGame(data: CreateGameRequest): Promise<CreateGameResponse> {
        return request<CreateGameResponse>("/games", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    getGame(gameId: string): Promise<GameResponse> {
        return request<GameResponse>(`/games/${gameId}`);
    },

    makeMove(
        gameId: string,
        data: MakeMoveRequest,
    ): Promise<MakeMoveResponse> {
        return request<MakeMoveResponse>(`/games/${gameId}/moves`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    resetGame(gameId: string): Promise<{ message: string }> {
        return request<{ message: string }>(`/games/${gameId}/reset`, {
            method: "POST",
        });
    },
};