export interface Arena {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
    isRecommended: boolean;
    isNearYou: boolean;
    sports: string[]; // Ex: ["Futebol", "Vôlei", "Tênis"]
    operatingHours: string;
    contactPhone: string;
    bookingPolicy: string;
    latitude?: number;
    longitude?: number;
    amenities?: string[]; // Ex: ["Cantina", "Aluguel de Bola", "Vestiários", "Churrasqueira"]
}
