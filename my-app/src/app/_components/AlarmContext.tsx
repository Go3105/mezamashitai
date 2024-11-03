// app/_components/AlarmContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type Alarm = {
    id: number;
    time: string;
    sound: string;
    remind: boolean;
    isActive: boolean;
    name: string;
};

type AlarmContextType = {
    alarms: Alarm[];
    addAlarm: (alarm: Alarm) => void;
    toggleAlarm: (id: number) => void;
    deleteAlarm: (id:number) => void;
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

    const deleteAlarm = (id: number) => {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id)); // アラームを削除
    };

    return (
        <AlarmContext.Provider value={{ alarms, addAlarm, toggleAlarm, deleteAlarm }}>
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
