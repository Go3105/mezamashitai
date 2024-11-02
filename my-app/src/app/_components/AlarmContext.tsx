// app/_components/AlarmContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Alarm = {
    id: number;
    time: string;
    sound: string;
    remind: boolean;
    isActive: boolean;
};

type AlarmContextType = {
    alarms: Alarm[];
    addAlarm: (alarm: Alarm) => void;
    toggleAlarm: (id: number) => void;
};

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export function AlarmProvider({ children }: { children: React.ReactNode }) {
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    const addAlarm = (alarm: Alarm) => {
        setAlarms((prevAlarms) => [...prevAlarms, { ...alarm, id: prevAlarms.length + 1 }]);
    };

    const toggleAlarm = (id: number) => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((alarm) =>
                alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
            )
        );
    };

    return (
        <AlarmContext.Provider value={{ alarms, addAlarm, toggleAlarm }}>
            {children}
        </AlarmContext.Provider>
    );
}

export function useAlarmContext() {
    const context = useContext(AlarmContext);
    if (!context) {
        throw new Error("useAlarmContext must be used within an AlarmProvider");
    }
    return context;
}
