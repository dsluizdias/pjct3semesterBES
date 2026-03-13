import { PrismaClient, SlotStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface HttpRequest {
  body?: any;
  query?: any;
  params?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export class SlotController {
  
  // GET /slots/available
  async getAvailableSlots(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { arenaId, date, period } = request.query || {};

      if (!arenaId || !date) {
        throw new Error('arenaId and date are required.');
      }

      // Base query for available slots on a specific date for a specific arena
      const whereClause: any = {
        arenaId,
        date: new Date(date),
        status: SlotStatus.AVAILABLE,
      };

      // BUSINESS RULE: Filter by Morning, Afternoon, Evening
      // Example time bounds (can be adjusted according to business needs)
      if (period) {
        if (period === 'Manhã') {
          whereClause.startTime = {
            gte: new Date(`${date}T06:00:00.000Z`),
            lt: new Date(`${date}T12:00:00.000Z`),
          };
        } else if (period === 'Tarde') {
          whereClause.startTime = {
            gte: new Date(`${date}T12:00:00.000Z`),
            lt: new Date(`${date}T18:00:00.000Z`),
          };
        } else if (period === 'Noite') {
          whereClause.startTime = {
            gte: new Date(`${date}T18:00:00.000Z`),
            lt: new Date(`${date}T23:59:59.000Z`),
          };
        }
      }

      const availableSlots = await prisma.timeSlot.findMany({
        where: whereClause,
        orderBy: { startTime: 'asc' },
      });

      return {
        statusCode: 200,
        body: availableSlots,
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { error: error.message },
      };
    }
  }
}
