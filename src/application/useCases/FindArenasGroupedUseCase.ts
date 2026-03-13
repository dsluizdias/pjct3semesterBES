import { ArenaRepository } from "../repositories/ArenaRepository";
import { Arena } from "../../domain/entities/Arena";

export class FindArenasGroupedUseCase {
    constructor(private arenaRepository: ArenaRepository) { }

    async execute(): Promise<{ recommended: Arena[]; nearYou: Arena[] }> {
        const recommended = await this.arenaRepository.findRecommendations();
        // In a real scenario, this would receive the user's current lat/long from the device
        const nearYou = await this.arenaRepository.findNearBy(-23.55052, -46.633308);

        return {
            recommended,
            nearYou,
        };
    }
}
