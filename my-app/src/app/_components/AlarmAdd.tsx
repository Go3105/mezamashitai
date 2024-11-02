// app/_components/AlarmAdd.tsx
"use client";

import React, { useState } from "react";
import { useAlarmContext } from "./AlarmContext";
import { useRouter } from "next/navigation";

const AlarmAdd = () => {
    const [time, setTime] = useState({ hours: "00", minutes: "00" });
    const [sound, setSound] = useState("default");
    const [remind, setRemind] = useState(false);
    const { addAlarm } = useAlarmContext();
    const router = useRouter();

    const handleSave = () => {
        const formattedTime = `${time.hours}:${time.minutes}`;
        addAlarm({
            id: 0, time: formattedTime, sound, remind,
            isActive: false
        });
        router.push("/alarm"); // 一覧画面に戻る
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">アラーム追加</h2>
            <div className="mb-4">
                <label htmlFor="time" className="block mb-2">時間を選択</label>
                <div className="flex">
                    <select
                        id="hours"
                        value={time.hours}
                        onChange={(e) => setTime({ ...time, hours: e.target.value })}
                        className="mr-2"
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={String(i).padStart(2, '0')}>
                                {String(i).padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                    :
                    <select
                        id="minutes"
                        value={time.minutes}
                        onChange={(e) => setTime({ ...time, minutes: e.target.value })}
                        className="ml-2"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={String(i * 5).padStart(2, '0')}>
                                {String(i * 5).padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="sound" className="block mb-2">サウンド設定</label>
                <select
                    id="sound"
                    value={sound}
                    onChange={(e) => setSound(e.target.value)}
                    className="block"
                >
                    <option value="default">デフォルト</option>
                    <option value="beep">ビープ音</option>
                    <option value="ring">着信音</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={remind}
                        onChange={() => setRemind(!remind)}
                        className="mr-2"
                    />
                    リマインドを有効にする
                </label>
            </div>
            
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                保存
            </button>
        </div>
    );
};

export default AlarmAdd;
