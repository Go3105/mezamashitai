"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlarmContext } from "../../_components/AlarmContext";

interface Params {
    id: string;
}

const AlarmEdit: React.FC<{ params: Params }> = ({ params }) => {
    const { alarms, updateAlarm } = useAlarmContext();
    const router = useRouter();


    const alarmId = params.id;
    const alarmToEdit = alarms.find(alarm => alarm.id === Number(alarmId));

    const [time, setTime] = useState({ hours: "00", minutes: "00" });
    const [sound, setSound] = useState("default");
    const [remind, setRemind] = useState(false);

    useEffect(() => {
        if (alarmToEdit) {
            const [hours, minutes] = alarmToEdit.time.split(":");
            setTime({ hours, minutes });
            setSound(alarmToEdit.sound);
            setRemind(alarmToEdit.remind);
        }
    }, [alarmToEdit]);

    const handleSave = () => {
        if (alarmToEdit) {
            const formattedTime = `${time.hours}:${time.minutes}`;
            updateAlarm({
                ...alarmToEdit,
                time: formattedTime,
                sound,
                remind,
            });
            router.push("/alarm"); // 一覧画面に戻る
        }
    };

    if (!alarmToEdit) {
        return <div>アラームが見つかりません。</div>; // アラームが見つからなかった場合のメッセージ
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">アラーム編集</h2>
            {/* 時間選択とサウンド設定 */}
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
            <label htmlFor="sound" className="block mb-2">サウンドを選択</label>
            <select
                id="sound"
                value={sound}
                onChange={(e) => setSound(e.target.value)}
                className="block"
            >
                <option value="default">デフォルト</option>
                <option value="bell">ベル</option>
                <option value="chime">チャイム</option>
            </select>
        </div>

        <div className="mb-4">
            <label htmlFor="remind" className="flex items-center">
                <input
                    type="checkbox"
                    id="remind"
                    checked={remind}
                    onChange={(e) => setRemind(e.target.checked)}
                    className="mr-2"
                />
                リマインダーを設定
            </label>
        </div>

        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
            保存
        </button>
    </div>
    );
};

export default AlarmEdit;