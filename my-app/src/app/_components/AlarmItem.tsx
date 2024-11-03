import React from "react";

type AlarmItemProps = {
    alarm: {
        id: number;
        time: string;
        isActive: boolean;
    };
    onToggle: () => void;
    onDelete: () => void;
};

export default function AlarmItem({ alarm, onToggle, onDelete }: AlarmItemProps){
    return(
        <li className="flex items-center justify-between mb-2">
            <span>{alarm.time}</span>
            <input
                type="checkbox"
                checked={alarm.isActive}
                onChange={onToggle}
                className="toggle-checkbox"
            />
            <button onClick={onDelete} className="ml-2 text-red-500">削除</button>
        </li>
    );
}