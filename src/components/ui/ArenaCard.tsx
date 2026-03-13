import { Arena } from "../../domain/entities/Arena";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

interface ArenaCardProps {
    arena: Arena;
}

export function ArenaCard({ arena }: ArenaCardProps) {
    return (
        <Link href={`/arena/${arena.id}`} className="group block">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="relative h-48 w-full">
                    <Image
                        src={arena.imageUrl}
                        alt={arena.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {arena.isRecommended && (
                        <div className="absolute top-3 left-3 bg-amareloOuro text-verdeEscuro text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                            Recomendado
                        </div>
                    )}
                    {arena.isNearYou && !arena.isRecommended && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                            Perto de Você
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star className="w-4 h-4 fill-amareloOuro text-amareloOuro" />
                        <span className="text-sm font-semibold">{arena.rating}</span>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                            {arena.name}
                        </h3>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">{arena.address}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {arena.sports.map((sport) => (
                            <span
                                key={sport}
                                className="bg-verdeBandeira/10 text-verdeBandeira dark:bg-verdeBandeira/20 dark:text-green-400 text-xs px-2 py-1 rounded-md font-medium"
                            >
                                {sport}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
