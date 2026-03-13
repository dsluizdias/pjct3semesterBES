import { SearchBar } from "../components/ui/SearchBar";
import { ArenaCard } from "../components/ui/ArenaCard";
import { diContainer } from "../infrastructure/config/dependencyInjection";

export default async function Home() {
    const { recommended, nearYou } = await diContainer.findArenasGroupedUseCase.execute();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-verdeBandeira text-white py-16 px-4 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e1635338?q=80&w=2000')] bg-cover bg-center"></div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Onde é o jogo hoje?
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-emerald-100 max-w-2xl mx-auto mb-10">
                        Encontre, reserve e jogue. As melhores quadras da sua região estão a apenas um clique de distância.
                    </p>

                    <div className="transform translate-y-12">
                        <SearchBar onSearch={async (term, cat) => {
                            "use server";
                            // Lógica de client side / filtro viria aqui ou com Query Params
                            console.log("Searching:", term, cat);
                        }} />
                    </div>
                </div>
            </section>

            {/* Main Content Areas */}
            <section className="max-w-6xl mx-auto px-4 w-full mt-24 pb-16 space-y-16">

                {/* Recomendados */}
                {recommended.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Em Alta / Recomendados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommended.map((arena) => (
                                <ArenaCard key={`rec-${arena.id}`} arena={arena} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Perto de você */}
                {nearYou.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Próximo a você</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nearYou.map((arena) => (
                                <ArenaCard key={`near-${arena.id}`} arena={arena} />
                            ))}
                        </div>
                    </div>
                )}

            </section>
        </div>
    );
}
