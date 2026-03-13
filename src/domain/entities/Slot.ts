export type Period = "Manhã" | "Tarde" | "Noite";

export interface Slot {
    id: string;
    arenaId: string;
    startTime: string; // Ex: "08:00"
    endTime: string;   // Ex: "09:00"
    period: Period;
    price: number;
    isAvailable: boolean;
}
