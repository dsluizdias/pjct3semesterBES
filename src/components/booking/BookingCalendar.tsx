"use client";

import { useState } from "react";
import { Slot, Period } from "../../domain/entities/Slot";

interface BookingCalendarProps {
    slots: Slot[];
    onSelectSlot: (slot: Slot) => void;
}

export function BookingCalendar({ slots, onSelectSlot }: BookingCalendarProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("Manhã");
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

    const periods: Period[] = ["Manhã", "Tarde", "Noite"];

    const filteredSlots = slots.filter((slot) => slot.period === selectedPeriod);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Escolha um Horário</h3>

            {/* Tabs de Período */}
            <div className="flex gap-2 mb-6 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg">
                {periods.map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${selectedPeriod === period
                                ? "bg-white dark:bg-gray-800 text-verdeBandeira shadow-sm"
                                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Grid de Horários */}
            <div className="grid grid-cols-3 gap-3">
                {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                        <button
                            key={slot.id}
                            disabled={!slot.isAvailable}
                            onClick={() => {
                                setSelectedSlotId(slot.id);
                                onSelectSlot(slot);
                            }}
                            className={`p-3 rounded-xl border text-center transition-all ${!slot.isAvailable
                                    ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed opacity-50"
                                    : selectedSlotId === slot.id
                                        ? "bg-verdeBandeira border-verdeBandeira text-white shadow-md transform scale-105"
                                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-amareloOuro hover:shadow-sm"
                                }`}
                        >
                            <div className="font-bold text-lg">{slot.startTime}</div>
                            <div className="text-xs opacity-80">R$ {slot.price}</div>
                        </button>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-500 py-4">
                        Nenhum horário disponível para {selectedPeriod.toLowerCase()}.
                    </div>
                )}
            </div>
        </div>
    );
}
