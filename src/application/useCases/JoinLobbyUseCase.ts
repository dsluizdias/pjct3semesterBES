import { LobbyRepository } from "../repositories/LobbyRepository";
import { DomainError } from "../../domain/errors/domainError";

export interface JoinLobbyParams {
    userId: string;
    lobbyId: string;
}

export class JoinLobbyUseCase {
    constructor(private readonly lobbyRepository: LobbyRepository) {}

    async execute(params: JoinLobbyParams) {
        if (!params.userId || !params.lobbyId) {
            throw new DomainError('userId and lobbyId are required.');
        }

        return this.lobbyRepository.join(params.lobbyId);
    }
}
