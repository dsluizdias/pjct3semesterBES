import { BookingRepository } from "../repositories/BookingRepository";
import { DomainError } from "../../domain/errors/domainError";

export interface CreateBookingParams {
  userId: string;
  slotId: string;
  termsAccepted: boolean;
}

export class CreateBookingUseCase {
    constructor(private readonly bookingRepository: BookingRepository) {}

    async execute(params: CreateBookingParams) {
        if (!params.termsAccepted) {
            throw new DomainError('You must accept the terms and conditions.');
        }

        return this.bookingRepository.createWithSlotCheck(
            params.userId,
            params.slotId,
            params.termsAccepted
        );
    }
}
