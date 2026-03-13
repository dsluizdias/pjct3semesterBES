import { Arena } from "../../domain/entities/Arena";
import { Period, Slot } from "../../domain/entities/Slot";

export interface ArenaRepository {
    findById(id: string): Promise<Arena | null>;
    findAll(): Promise<Arena[]>;
    findBySport(sport: string): Promise<Arena[]>;
    search(params: { latitude?: number; longitude?: number; sport?: string; radiusInKm?: number }): Promise<Arena[]>;
    // Métodos básicos para a Home buscar e filtrar:
    findRecommendations(): Promise<Arena[]>;
    findNearBy(lat: number, lng: number): Promise<Arena[]>;

    // Buscar slots da arena (poderia ter um SlotRepository, mas pro escopo unimos aqui para leitura limpa)
    findAvailableSlots(arenaId: string, date: string, period?: Period): Promise<Slot[]>;
}
