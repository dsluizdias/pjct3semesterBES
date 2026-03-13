import { User } from "./User";
import { Arena } from "./Arena";
import { Slot } from "./Slot";

export interface Booking {
    id: string;
    user: User;
    arena: Arena;
    slot: Slot;
    date: string; // Ex: "2026-03-10"
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    isLobbyMode: boolean; // True se o usuário abriu a partida para terceiros
    lobbyPlayers?: User[]; // Jogadores que entraram pelo Lobby
}
