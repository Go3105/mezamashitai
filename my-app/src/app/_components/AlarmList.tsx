"use client";
import React from "react";
import AlarmItem from "./AlarmItem";
import { useAlarmContext } from "./AlarmContext";

export default function AlarmList() {
  const { alarms, toggleAlarm, deleteAlarm } = useAlarmContext();

  // 時刻順にアラームをソート
  const sortedAlarms = [...alarms].sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time}:00`).getTime();
    const timeB = new Date(`1970-01-01T${b.time}:00`).getTime();
    return timeA - timeB;
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {sortedAlarms.map((alarm) => (
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
