import { HttpRequest, HttpResponse, created, ok, badRequest } from '../protocols/http';
import { CreateBookingUseCase } from '../../application/useCases/CreateBookingUseCase';
import { CancelBookingUseCase } from '../../application/useCases/CancelBookingUseCase';
import { DomainError } from '../../domain/errors/domainError';

export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase
  ) {}

  // POST /bookings
  async createBooking(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId, slotId, termsAccepted } = request.body || {};

      const booking = await this.createBookingUseCase.execute({
        userId,
        slotId,
        termsAccepted,
      });

      return created(booking);
    } catch (error: any) {
      if (error instanceof DomainError) {
        return { statusCode: error.statusCode, body: { error: error.message } };
      }
      return badRequest(error);
    }
  }

  // DELETE /bookings/:id (Cancel booking)
  async cancelBooking(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params || {};

      await this.cancelBookingUseCase.execute({ bookingId: id });

      return ok({ message: 'Reserva cancelada com sucesso.' });
    } catch (error: any) {
      if (error instanceof DomainError) {
        return { statusCode: error.statusCode, body: { error: error.message } };
      }
      return badRequest(error);
    }
  }
}
