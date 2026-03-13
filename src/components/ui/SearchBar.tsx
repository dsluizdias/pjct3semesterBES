"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    onSearch: (term: string, category: string) => void;
}

const CATEGORIES = ["Todos", "Futebol", "Vôlei", "Tênis"];

export function SearchBar({ onSearch }: SearchBarProps) {
    const [term, setTerm] = useState("");
    const [category, setCategory] = useState("Todos");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term, category === "Todos" ? "" : category);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-100 dark:border-gray-700"
            >
                <div className="flex-grow flex items-center pl-4">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, região ou arena..."
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-400 outline-none"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-verdeBandeira hover:bg-verdeEscuro text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
                >
                    Pesquisar
                </button>
            </form>

            <div className="flex justify-center gap-3 flex-wrap">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setCategory(cat);
                            onSearch(term, cat === "Todos" ? "" : cat);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat
                                ? "bg-amareloOuro text-verdeEscuro shadow-md"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
