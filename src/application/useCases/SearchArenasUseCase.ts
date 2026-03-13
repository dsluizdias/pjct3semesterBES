import { ArenaRepository } from "../repositories/ArenaRepository";
import { Arena } from "../../domain/entities/Arena";

export interface SearchArenasParams {
    latitude?: number;
    longitude?: number;
    sport?: string;
    radiusInKm?: number;
}

export class SearchArenasUseCase {
    constructor(private readonly arenaRepository: ArenaRepository) {}

    async execute(params: SearchArenasParams): Promise<Arena[]> {
        return this.arenaRepository.search(params);
    }
}
