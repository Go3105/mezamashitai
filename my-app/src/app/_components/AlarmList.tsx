// app/_components/AlarmList.tsx
"use client";
import React from "react";
import AlarmItem from "./AlarmItem";
import { useAlarmContext } from "./AlarmContext";

export default function AlarmList() {
    const { alarms, toggleAlarm, deleteAlarm } = useAlarmContext();

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
