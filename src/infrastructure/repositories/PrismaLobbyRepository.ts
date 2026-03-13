import { LobbyRepository } from "../../application/repositories/LobbyRepository";
import { PrismaClient } from "@prisma/client";
import { DomainError } from "../../domain/errors/domainError";

const prisma = new PrismaClient();

export class PrismaLobbyRepository implements LobbyRepository {
  async join(lobbyId: string): Promise<any> {
    return prisma.$transaction(async (tx) => {
      const currentLobby = await tx.lobby.findUnique({
        where: { id: lobbyId },
      });

      if (!currentLobby) {
        throw new DomainError('Lobby not found.', 404);
      }

      if (currentLobby.currentPlayers >= currentLobby.maxPlayers) {
        throw new DomainError('Lobby is already full.', 409);
      }

      const updatedLobby = await tx.lobby.update({
        where: { id: lobbyId },
        data: {
          currentPlayers: { increment: 1 }
        },
      });

      return updatedLobby;
    });
  }
}
