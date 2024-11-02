// app/_components/AlarmList.tsx
"use client";
import React from "react";
import AlarmItem from "./AlarmItem";
import { useAlarmContext } from "./AlarmContext";

export default function AlarmList() {
    const { alarms, toggleAlarm } = useAlarmContext();

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">アラーム</h2>
            <ul>
                {alarms.map((alarm) => (
                    <AlarmItem
                        key={alarm.id}
                        alarm={alarm}
                        onToggle={() => toggleAlarm(alarm.id)}
                    />
                ))}
            </ul>
        </div>
    );
}
