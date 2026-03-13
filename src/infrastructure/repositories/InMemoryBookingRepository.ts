import { Booking } from "../../domain/entities/Booking";
import { User } from "../../domain/entities/User";
import { BookingRepository } from "../../application/repositories/BookingRepository";
import { Arena } from "../../domain/entities/Arena";
import { Slot } from "../../domain/entities/Slot";
export class InMemoryBookingRepository implements BookingRepository {
    private bookings: Booking[] = [];

    async create(booking: Booking): Promise<Booking> {
        this.bookings.push(booking);
        return booking;
    }

    async findById(id: string): Promise<Booking | null> {
        return this.bookings.find((b) => b.id === id) || null;
    }

    async findByUser(userId: string): Promise<Booking[]> {
        return this.bookings.filter((b) => b.user.id === userId);
    }

    async updateStatus(id: string, status: "PENDING" | "CONFIRMED" | "CANCELLED"): Promise<Booking> {
        const booking = await this.findById(id);
        if (!booking) throw new Error("Booking not found");
        booking.status = status;
        return booking;
    }

    async joinLobby(bookingId: string, player: User): Promise<Booking> {
        const booking = await this.findById(bookingId);
        if (!booking) throw new Error("Booking not found");
        if (!booking.isLobbyMode) throw new Error("Booking is not open for lobby");

        if (!booking.lobbyPlayers) {
            booking.lobbyPlayers = [];
        }

        // Simplification for the mock, checking if not already in lobby
        const alreadyIn = booking.lobbyPlayers.some(p => p.id === player.id);
        if (!alreadyIn) {
            booking.lobbyPlayers.push(player);
        }

        return booking;
    }

    async createWithSlotCheck(userId: string, slotId: string, termsAccepted: boolean): Promise<Booking> {
        // Mock implementation for memory repo
        const mockArena: Arena = {
            id: "fake-arena-id",
            name: "Mock Arena",
            address: "Mock Address",
            imageUrl: "",
            rating: 5,
            isRecommended: true,
            isNearYou: true,
            sports: ["Futebol"],
            operatingHours: "08:00 - 22:00",
            contactPhone: "(11) 99999-9999",
            bookingPolicy: "Mock Policy"
        };
        
        const mockSlot: Slot = {
            id: slotId,
            arenaId: mockArena.id,
            startTime: "08:00",
            endTime: "09:00",
            period: "Manhã",
            price: 150,
            isAvailable: false
        };

        const newBooking: Booking = {
            id: crypto.randomUUID(),
            user: { id: userId, name: "Mock User", email: "mock@example.com" },
            arena: mockArena,
            slot: mockSlot,
            date: new Date().toISOString(),
            status: "PENDING",
            isLobbyMode: false
        };

        return this.create(newBooking);
    }

    async getBookingWithSlot(id: string): Promise<(Booking & { timeSlot: Slot }) | null> {
        const booking = await this.findById(id);
        if (!booking) return null;
        return {
            ...booking,
            timeSlot: booking.slot
        };
    }

    async cancel(id: string, slotId: string): Promise<void> {
        await this.updateStatus(id, "CANCELLED");
    }
}
