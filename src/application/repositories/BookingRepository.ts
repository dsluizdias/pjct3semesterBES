import { Booking } from "../../domain/entities/Booking";
import { User } from "../../domain/entities/User";

export interface BookingRepository {
    create(booking: Booking): Promise<Booking>;
    findById(id: string): Promise<Booking | null>;
    findByUser(userId: string): Promise<Booking[]>;
    updateStatus(id: string, status: "PENDING" | "CONFIRMED" | "CANCELLED"): Promise<Booking>;

    // Lobby Feature
    joinLobby(bookingId: string, player: User): Promise<Booking>;

    // Transactional bounds
    createWithSlotCheck(userId: string, slotId: string, termsAccepted: boolean): Promise<Booking>;
    getBookingWithSlot(id: string): Promise<(Booking & { timeSlot: import("../../domain/entities/Slot").Slot }) | null>;
    cancel(id: string, slotId: string): Promise<void>;
}
