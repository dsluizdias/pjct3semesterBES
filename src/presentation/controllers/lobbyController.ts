import { HttpRequest, HttpResponse, ok, badRequest } from '../protocols/http';
import { JoinLobbyUseCase } from '../../application/useCases/JoinLobbyUseCase';
import { DomainError } from '../../domain/errors/domainError';

export class LobbyController {
  constructor(private readonly joinLobbyUseCase: JoinLobbyUseCase) {}

  // POST /lobbies/join
  async joinLobby(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId, lobbyId } = request.body || {};

      const lobby = await this.joinLobbyUseCase.execute({ userId, lobbyId });

      return ok({
        message: 'Successfully joined the lobby.',
        lobby,
      });
    } catch (error: any) {
      if (error instanceof DomainError) {
        return { statusCode: error.statusCode, body: { error: error.message } };
      }
      return badRequest(error);
    }
  }

  // RESTRICTION: The system MUST NOT process voice or chat calls
  // The team will leverage third-party services directly from the client 
  // without piping it through the backend server ensuring performance.
}
