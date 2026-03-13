import { ArenaRepository } from "../../application/repositories/ArenaRepository";
import { Arena } from "../../domain/entities/Arena";
import { Period, Slot } from "../../domain/entities/Slot";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaArenaRepository implements ArenaRepository {
  private mapToDomain(prismaArena: any): Arena {
    return {
      id: String(prismaArena.id),
      name: String(prismaArena.name),
      address: String(prismaArena.address),
      imageUrl: String(prismaArena.imageUrl),
      rating: Number(prismaArena.rating),
      isRecommended: Boolean(prismaArena.isRecommended),
      isNearYou: Boolean(prismaArena.isNearYou),
      sports: Array.isArray(prismaArena.sports) ? prismaArena.sports : [],
      operatingHours: String(prismaArena.operatingHours),
      contactPhone: String(prismaArena.contactPhone),
      bookingPolicy: String(prismaArena.bookingPolicy),
      latitude: prismaArena.latitude ? Number(prismaArena.latitude) : undefined,
      longitude: prismaArena.longitude ? Number(prismaArena.longitude) : undefined,
      amenities: Array.isArray(prismaArena.amenities) ? prismaArena.amenities : undefined,
    };
  }

  async search(params: { latitude?: number; longitude?: number; sport?: string; radiusInKm?: number }): Promise<Arena[]> {
    const { sport } = params;
    
    // Simplification for the example:
    const arenas = await prisma.arena.findMany({
      where: {
        sports: sport ? { has: sport } : undefined,
      },
    });
    
    return arenas.map((arena) => this.mapToDomain(arena));
  }

  async findById(id: string): Promise<Arena | null> {
    const arena = await prisma.arena.findUnique({ where: { id } });
    if (!arena) return null;
    return this.mapToDomain(arena);
  }

  async findAll(): Promise<Arena[]> {
    const arenas = await prisma.arena.findMany();
    return arenas.map((arena) => this.mapToDomain(arena));
  }

  async findBySport(sport: string): Promise<Arena[]> {
    const arenas = await prisma.arena.findMany({ where: { sports: { has: sport } } });
    return arenas.map((arena) => this.mapToDomain(arena));
  }

  async findRecommendations(): Promise<Arena[]> {
    throw new Error("Method not implemented.");
  }

  async findNearBy(lat: number, lng: number): Promise<Arena[]> {
    throw new Error("Method not implemented.");
  }

  async findAvailableSlots(arenaId: string, date: string, period?: Period): Promise<Slot[]> {
    throw new Error("Method not implemented.");
  }
}
