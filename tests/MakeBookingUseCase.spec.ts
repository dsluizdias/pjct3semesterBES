import { MakeBookingUseCase } from "../src/application/useCases/MakeBookingUseCase";
import { InMemoryArenaRepository } from "../src/infrastructure/repositories/InMemoryArenaRepository";
import { InMemoryBookingRepository } from "../src/infrastructure/repositories/InMemoryBookingRepository";
import { User } from "../src/domain/entities/User";

describe('MakeBookingUseCase', () => {
    let makeBookingUseCase: MakeBookingUseCase;
    let arenaRepo: InMemoryArenaRepository;
    let bookingRepo: InMemoryBookingRepository;

    const mockUser: User = { id: "u1", name: "João", email: "joao@teste.com" };

    beforeEach(() => {
        arenaRepo = new InMemoryArenaRepository();
        bookingRepo = new InMemoryBookingRepository();
        makeBookingUseCase = new MakeBookingUseCase(bookingRepo, arenaRepo);
    });

    it('deve realizar uma reserva com sucesso', async () => {
        // Arena 1 com Slot s1 disponivel de manhã
        const booking = await makeBookingUseCase.execute(mockUser, "1", "s1", "2026-03-10", false);

        expect(booking).toBeDefined();
        expect(booking.status).toBe("PENDING");
        expect(booking.isLobbyMode).toBe(false);
        expect(booking.slot.id).toBe("s1");
    });

    it('deve permitir criar reserva com Lobby Mode ativado', async () => {
        const booking = await makeBookingUseCase.execute(mockUser, "1", "s1", "2026-03-10", true);

        expect(booking.isLobbyMode).toBe(true);
        expect(booking.lobbyPlayers).toEqual([]); // Inicia vazio
    });

    it('deve retornar erro ao tentar reservar slot inexistente/reservado', async () => {
        // Slot s3 já está falso (isAvailable: false) no InMemory
        await expect(
            makeBookingUseCase.execute(mockUser, "1", "s3", "2026-03-10", false)
        ).rejects.toThrow("Slot not available");
    });
});
