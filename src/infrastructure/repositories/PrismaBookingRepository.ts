import { BookingRepository } from "../../application/repositories/BookingRepository";
import { Booking } from "../../domain/entities/Booking";
import { User } from "../../domain/entities/User";
import { PrismaClient, SlotStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaBookingRepository implements BookingRepository {
    async createWithSlotCheck(userId: string, slotId: string, termsAccepted: boolean): Promise<any> {
        return prisma.$transaction(async (tx) => {
            const slot = await tx.timeSlot.findUnique({
                where: { id: slotId },
            });

            if (!slot) {
                throw new Error('Slot not found.');
            }

            if (slot.status !== SlotStatus.AVAILABLE) {
                throw new Error('This time slot is no longer available.');
            }

            await tx.timeSlot.update({
                where: { id: slotId },
                data: { status: SlotStatus.RESERVED },
            });

            return tx.booking.create({
                data: {
                    userId,
                    slotId,
                    termsAccepted,
                },
            });
        });
    }

    async getBookingWithSlot(id: string): Promise<any> {
        return prisma.booking.findUnique({
            where: { id },
            include: { timeSlot: true },
        });
    }

    async cancel(id: string, slotId: string): Promise<void> {
        await prisma.$transaction([
            prisma.booking.update({
              where: { id },
              data: { paymentStatus: 'CANCELLED' }, 
            }),
            prisma.timeSlot.update({
              where: { id: slotId },
              data: { status: SlotStatus.AVAILABLE },
            })
        ]);
    }

    // Unused abstractions in this refactor step, returning null/mocks
    async create(booking: Booking): Promise<Booking> { return booking; }
    async findById(id: string): Promise<Booking | null> { return null; }
    async findByUser(userId: string): Promise<Booking[]> { return []; }
    async updateStatus(id: string, status: "PENDING" | "CONFIRMED" | "CANCELLED"): Promise<Booking> { return {} as Booking; }
    async joinLobby(bookingId: string, player: User): Promise<Booking> { return {} as Booking; }
}
