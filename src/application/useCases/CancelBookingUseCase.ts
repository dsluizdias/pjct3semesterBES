import { BookingRepository } from "../repositories/BookingRepository";
import { DomainError } from "../../domain/errors/domainError";

export interface CancelBookingParams {
    bookingId: string;
}

export class CancelBookingUseCase {
    constructor(private readonly bookingRepository: BookingRepository) {}

    async execute(params: CancelBookingParams) {
        const booking = await this.bookingRepository.getBookingWithSlot(params.bookingId);
        
        if (!booking) {
            throw new DomainError('Booking not found.', 404);
        }

        const now = new Date();
        const slotStartTimeStr = `${booking.date.split('T')[0]}T${booking.timeSlot.startTime}:00`;
        const slotStartTime = new Date(slotStartTimeStr);
        
        // Se a data for inválida, assume 0 para passar pela regra ou cair no erro dependendo do caso.
        const slotTime = isNaN(slotStartTime.getTime()) ? now.getTime() : slotStartTime.getTime();
        const hoursUntilStart = (slotTime - now.getTime()) / (1000 * 60 * 60);

        // BUSINESS RULE: Cancel only with 24h+ in advance
        if (hoursUntilStart < 24) {
            throw new DomainError('Cancelamento permitido apenas com 24h de antecedência.');
        }

        await this.bookingRepository.cancel(params.bookingId, booking.slot.id);
    }
}
