// app/_components/AlarmList.tsx
"use client";
import React from "react";
import AlarmItem from "./AlarmItem";
import { useAlarmContext } from "./AlarmContext";

type Alarm = {
    id: number;
    name: string;
    time: string;
    isActive: boolean;
};

type AlarmListProps = {
    alarms: Alarm[]; // alarmsの型を定義
};

export default function AlarmList({ alarms }: AlarmListProps) {
    const { toggleAlarm, deleteAlarm } = useAlarmContext();

    return (
        <div className="p-4"> 
            <ul>
                {alarms.map((alarm) => (
                    <AlarmItem
                        key={alarm.id}
                        alarm={alarm}
                        onToggle={() => toggleAlarm(alarm.id)}
                        onDelete={() => deleteAlarm(alarm.id)}
                    />
                ))}
            </ul>
        </div>
    );
}
