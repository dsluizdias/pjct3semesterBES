import { HttpRequest, HttpResponse, ok, badRequest } from '../protocols/http';
import { SearchArenasUseCase } from '../../application/useCases/SearchArenasUseCase';

export class ArenaController {
  constructor(private readonly searchArenasUseCase: SearchArenasUseCase) {}

  // GET /arenas/search
  async searchArenas(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { latitude, longitude, sport, radiusInKm = 10 } = request.query || {};

      const arenas = await this.searchArenasUseCase.execute({
        latitude,
        longitude,
        sport,
        radiusInKm,
      });

      return ok(arenas);
    } catch (error: any) {
      return badRequest(error);
    }
  }
}
