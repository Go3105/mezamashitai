import React from "react";

type AlarmItemProps = {
    alarm: {
        id: number;
        time: string;
        isActive: boolean;
    };
    onToggle: () => void;
};

export default function AlarmItem({ alarm, onToggle }: AlarmItemProps){
    return(
        <li className="flex items-center justify-between mb-2">
            <span>{alarm.time}</span>
            <input
                type="checkbox"
                checked={alarm.isActive}
                onChange={onToggle}
                className="toggle-checkbox"
            />
        </li>
    );
}