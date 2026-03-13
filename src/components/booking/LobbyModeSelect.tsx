"use client";

import { Users } from "lucide-react";

interface LobbyModeSelectProps {
    isLobbyMode: boolean;
    onLobbyModeChange: (isLobbyMode: boolean) => void;
}

export function LobbyModeSelect({ isLobbyMode, onLobbyModeChange }: LobbyModeSelectProps) {
    return (
        <div
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 items-start ${isLobbyMode
                    ? "border-verdeBandeira bg-verdeBandeira/5"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-verdeBandeira/30"
                }`}
            onClick={() => onLobbyModeChange(!isLobbyMode)}
        >
            <div className={`p-2 rounded-full ${isLobbyMode ? 'bg-verdeBandeira text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                <Users className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Abrir Partida (Modo Lobby)</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permita que outras pessoas entrem na sua reserva. Ideal para rachões e fechar times. O valor da quadra será dividido entre os participantes.
                </p>
            </div>

            {/* Checkbox visual */}
            <div className="ml-auto mt-2 h-6 w-6 shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors">
                {isLobbyMode && (
                    <div className="h-3 w-3 rounded-full bg-verdeBandeira shrink-0" />
                )}
            </div>
        </div>
    );
}
