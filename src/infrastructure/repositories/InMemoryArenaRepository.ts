import { ArenaRepository } from "../../application/repositories/ArenaRepository";
import { Arena } from "../../domain/entities/Arena";
import { Period, Slot } from "../../domain/entities/Slot";
import { mockArenas, mockSlots } from "./mockData";
export class InMemoryArenaRepository implements ArenaRepository {
    private arenas: Arena[] = mockArenas;

    private slots: Slot[] = mockSlots;

    async findById(id: string): Promise<Arena | null> {
        return this.arenas.find((a) => a.id === id) || null;
    }

    async findAll(): Promise<Arena[]> {
        return this.arenas;
    }

    async findBySport(sport: string): Promise<Arena[]> {
        return this.arenas.filter((a) => a.sports.includes(sport));
    }

    async search(params: { latitude?: number; longitude?: number; sport?: string; radiusInKm?: number }): Promise<Arena[]> {
        const { sport } = params;
        if (sport) {
            return this.findBySport(sport);
        }
        return this.findAll();
    }

    async findRecommendations(): Promise<Arena[]> {
        return this.arenas.filter((a) => a.isRecommended);
    }

    async findNearBy(lat: number, lng: number): Promise<Arena[]> {
        // Mocking distance check just returning the boolean isNearYou
        return this.arenas.filter((a) => a.isNearYou);
    }

    async findAvailableSlots(arenaId: string, date: string, period?: Period): Promise<Slot[]> {
        let availableSlots = this.slots.filter(s => s.arenaId === arenaId && s.isAvailable);
        if (period) {
            availableSlots = availableSlots.filter(s => s.period === period);
        }
        return availableSlots;
    }
}
