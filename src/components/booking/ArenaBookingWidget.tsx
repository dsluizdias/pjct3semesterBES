"use client";

import { useState } from "react";
import { Slot } from "../../domain/entities/Slot";
import { BookingCalendar } from "./BookingCalendar";
import { LobbyModeSelect } from "./LobbyModeSelect";

export function ArenaBookingWidget({ slots }: { slots: Slot[] }) {
    const [isLobbyMode, setIsLobbyMode] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    return (
        <div className="sticky top-6">
            <BookingCalendar 
                slots={slots} 
                onSelectSlot={(slot) => setSelectedSlot(slot)} 
            />

            <div className="mt-6">
                <LobbyModeSelect 
                    isLobbyMode={isLobbyMode} 
                    onLobbyModeChange={setIsLobbyMode} 
                />
            </div>

            <button 
                disabled={!selectedSlot}
                className={`w-full mt-6 text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform ${
                    selectedSlot 
                        ? "bg-verdeBandeira hover:bg-verdeEscuro hover:-translate-y-1" 
                        : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                    alert(`Simulação de Reserva!\nHorário: ${selectedSlot?.startTime}\nModo Lobby: ${isLobbyMode ? "Ativado" : "Desativado"}`);
                }}
            >
                {selectedSlot ? 'Confirmar Reserva' : 'Selecione um horário'}
            </button>
        </div>
    );
}
