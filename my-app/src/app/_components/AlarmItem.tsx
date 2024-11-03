import React from "react";

type AlarmItemProps = {
    alarm: {
        id: number;
        name: string;
        time: string;
        isActive: boolean;
    };
    onToggle: () => void;
    onDelete: () => void;
};

export default function AlarmItem({ alarm, onToggle, onDelete }: AlarmItemProps){
    const handleDelete = () => {
        const confirmd = window.confirm("本当に削除しますか？");
        if(confirmd){
            onDelete();
        }
    };

    return(
        <li className="flex items-center justify-center text-center mb-2">
            <span className="flex-1">{alarm.name}</span>
            <span className="flex-1">{alarm.time}</span>
            <input
                type="checkbox"
                checked={alarm.isActive}
                onChange={onToggle}
                className="toggle-checkbox mx-2"
            />
            <button onClick={handleDelete} className="ml-2 text-red-500">削除</button>
        </li>
    );
}