import React, { useState, useEffect} from "react";
import AlarmItem from "./AlarmItem";

type Alarm = {
    id: number;
    time: string;
    isActive: boolean;
};

export default function AlarmList() {
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    useEffect(() => {
        const fetchedAlarms = [
            { id: 1, time: "7:00", isActive: true },
            { id: 2, time: "7:10", isActive: true },
            { id: 3, time: "7:25", isActive: false },
            { id: 4, time: "7:40", isActive: true },
        ];
        setAlarms(fetchedAlarms);
    }, []);

    const toggleAlarm = (id: number) => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((alarm) =>
                alarm.id === id ? { ...alarm, isActive: !alarm.isActive } :alarm
            )
        );
    };

    return (
        <div className="p-4">
            <h2 className="text-x1 font-bold mb-4">アラーム</h2>
            <ul>
                {alarms.map((alarm) => (
                    <AlarmItem key={alarm.id} alarm={alarm} onToggle={() => toggleAlarm(alarm.id)} />
                ))}
            </ul>
        </div>
    );
}