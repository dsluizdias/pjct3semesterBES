import { BookingRepository } from "../repositories/BookingRepository";
import { ArenaRepository } from "../repositories/ArenaRepository";
import { Booking } from "../../domain/entities/Booking";
import { User } from "../../domain/entities/User";
import { Slot } from "../../domain/entities/Slot";


export class MakeBookingUseCase {
    constructor(
        private bookingRepository: BookingRepository,
        private arenaRepository: ArenaRepository
    ) { }

    async execute(
        user: User,
        arenaId: string,
        slotId: string,
        date: string,
        isLobbyMode: boolean
    ): Promise<Booking> {
        const arena = await this.arenaRepository.findById(arenaId);
        if (!arena) throw new Error("Arena not found");

        const slots = await this.arenaRepository.findAvailableSlots(arenaId, date);
        const slot = slots.find(s => s.id === slotId);

        if (!slot || !slot.isAvailable) {
            throw new Error("Slot not available");
        }

        const newBooking: Booking = {
            id: Math.random().toString(36).substring(7), // Mock ID
            user,
            arena,
            slot,
            date,
            status: "PENDING", // Depende de gateway de pagamento na vida real
            isLobbyMode,
            lobbyPlayers: isLobbyMode ? [] : undefined
        };

        return this.bookingRepository.create(newBooking);
    }
}
