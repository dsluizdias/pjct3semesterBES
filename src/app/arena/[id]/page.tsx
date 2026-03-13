import { InMemoryArenaRepository } from "../../../infrastructure/repositories/InMemoryArenaRepository";
import { ArenaBookingWidget } from "../../../components/booking/ArenaBookingWidget";
import { Star, MapPin, Phone, Info, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Este componente precisa ser Async em App Router param params: Promise<{ id: string }>
export default async function ArenaDetail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const repo = new InMemoryArenaRepository();
    const arena = await repo.findById(params.id);

    if (!arena) {
        notFound();
    }

    const dateToSearch = "2026-03-10"; // Hardcoded for prototype
    const slots = await repo.findAvailableSlots(arena.id, dateToSearch);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Imagem Hero e Info principal */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg mb-8">
                <div className="relative h-64 md:h-96 w-full">
                    <Image src={arena.imageUrl} alt={arena.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-extrabold mb-2">{arena.name}</h1>
                                <div className="flex items-center text-gray-200">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {arena.address}
                                </div>
                            </div>
                            <div className="hidden md:flex bg-amareloOuro text-verdeEscuro items-center px-4 py-2 rounded-xl font-bold">
                                <Star className="w-5 h-5 mr-2 fill-verdeEscuro" />
                                {arena.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lado Esquerdo - infos */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <Info className="w-6 h-6 mr-2 text-verdeBandeira" />
                            Sobre a Arena
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300">
                            <p>
                                <strong>Modalidades:</strong> {arena.sports.join(", ")}
                            </p>
                            <p>
                                <strong>Horário de Funcionamento:</strong> {arena.operatingHours}
                            </p>
                            <p>
                                <strong className="text-red-500 font-bold block mb-1">Política de Cancelamento:</strong>
                                {arena.bookingPolicy}
                            </p>
                        </div>
                    </section>

                    {arena.amenities && arena.amenities.length > 0 && (
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <CheckCircle2 className="w-6 h-6 mr-2 text-verdeBandeira" />
                                Facilidades
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                                {arena.amenities.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-verdeBandeira mr-3"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <Phone className="w-6 h-6 mr-2 text-verdeBandeira" />
                            Contato
                        </h2>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{arena.contactPhone}</p>
                    </section>
                </div>

                {/* Lado Direito - Componentes de Booking */}
                <div className="lg:col-span-1 space-y-6 relative">
                    <ArenaBookingWidget slots={slots} />
                </div>
            </div>
        </div>
    );
}
