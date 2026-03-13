import { Arena } from "../../domain/entities/Arena";
import { Slot } from "../../domain/entities/Slot";

export const mockArenas: Arena[] = [
    {
        id: "1",
        name: "Arena Gol de Placa",
        address: "Rua do Ouro, 123 - Centro",
        imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800",
        rating: 4.8,
        isRecommended: true,
        isNearYou: true,
        sports: ["Futebol"],
        operatingHours: "08:00 - 23:00",
        contactPhone: "(11) 99999-9999",
        bookingPolicy: "Cancelamento grátis até 24h antes.",
        latitude: -23.55052,
        longitude: -46.633308,
        amenities: ["Cantina", "Aluguel de Bola", "Vestiários", "Bebedouro"]
    },
    {
        id: "2",
        name: "Play Tênis Club",
        address: "Avenida Verde, 456 - Jardins",
        imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800",
        rating: 4.5,
        isRecommended: false,
        isNearYou: true,
        sports: ["Tênis"],
        operatingHours: "06:00 - 22:00",
        contactPhone: "(11) 98888-8888",
        bookingPolicy: "Necessário pagamento de 50% de sinal.",
        latitude: -23.56052,
        longitude: -46.643308,
        amenities: ["Aluguel de Raquete", "Bolinhas inclusas", "Vestiários Premium", "Estacionamento"]
    },
    {
        id: "3",
        name: "Praia Vôlei Arena",
        address: "Av. Beira Mar, S/N - Orla",
        imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800",
        rating: 4.9,
        isRecommended: true,
        isNearYou: false,
        sports: ["Vôlei"],
        operatingHours: "08:00 - 20:00",
        contactPhone: "(11) 97777-7777",
        bookingPolicy: "Reservas apenas online.",
        latitude: -23.57052,
        longitude: -46.653308,
        amenities: ["Duchas", "Quiosque de Sucos", "Aluguel de Bola"]
    },
    {
        id: "4",
        name: "Quadra Dunk Master",
        address: "Rua da Cesta, 88 - Vila Madalena",
        imageUrl: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800",
        rating: 4.7,
        isRecommended: true,
        isNearYou: true,
        sports: ["Basquete"],
        operatingHours: "10:00 - 22:00",
        contactPhone: "(11) 96666-6666",
        bookingPolicy: "Devolução integral com 48h de aviso.",
        latitude: -23.58052,
        longitude: -46.663308,
        amenities: ["Placar Eletrônico", "Bebedouro", "Bolas de Basquete", "Arquibancada"]
    },
    {
        id: "5",
        name: "Society Estrela",
        address: "Av. Campos, 102 - Morumbi",
        imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800",
        rating: 4.6,
        isRecommended: false,
        isNearYou: true,
        sports: ["Futebol"],
        operatingHours: "07:00 - 00:00",
        contactPhone: "(11) 95555-5555",
        bookingPolicy: "Sujeito a lotação máxima.",
        latitude: -23.59052,
        longitude: -46.673308,
        amenities: ["Bar e Lanchonete", "Churrasqueira", "Aluguel de Colete e Bola"]
    },
    {
        id: "6",
        name: "Beach Tennis Verão",
        address: "Praia de Areia, Lote 5",
        imageUrl: "https://plus.unsplash.com/premium_photo-1663100147690-3ae8e4414e08?q=80&w=800",
        rating: 5.0,
        isRecommended: true,
        isNearYou: false,
        sports: ["Beach Tennis"],
        operatingHours: "06:00 - 18:00",
        contactPhone: "(11) 94444-4444",
        bookingPolicy: "Uso obrigatório de raquetes padrão.",
        latitude: -23.60052,
        longitude: -46.683308,
        amenities: ["Aluguel de Raquete", "Bar da Praia", "Ducha Externa"]
    }
];

export const mockSlots: Slot[] = [
    { id: "s1", arenaId: "1", startTime: "08:00", endTime: "09:00", period: "Manhã", price: 150, isAvailable: true },
    { id: "s2", arenaId: "1", startTime: "19:00", endTime: "20:00", period: "Noite", price: 200, isAvailable: true },
    { id: "s3", arenaId: "1", startTime: "20:00", endTime: "21:00", period: "Noite", price: 200, isAvailable: false },
];
