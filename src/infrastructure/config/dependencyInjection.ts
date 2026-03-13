import { InMemoryArenaRepository } from "../repositories/InMemoryArenaRepository";
import { FindArenasGroupedUseCase } from "../../application/useCases/FindArenasGroupedUseCase";
import { PrismaArenaRepository } from "../repositories/PrismaArenaRepository";

// Simple DI Container
class DIContainer {
    private static _instance: DIContainer;

    private constructor() {}

    static get instance(): DIContainer {
        if (!DIContainer._instance) {
            DIContainer._instance = new DIContainer();
        }
        return DIContainer._instance;
    }

    get arenaRepository() {
        // Use an environment variable to toggle repositories in a real app
        // For now, defaulting to InMemory as it was the original mock
        return new InMemoryArenaRepository();
    }

    get findArenasGroupedUseCase() {
        return new FindArenasGroupedUseCase(this.arenaRepository);
    }
}

export const diContainer = DIContainer.instance;
