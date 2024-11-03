// src/app/stopAlarm/page.tsx
"use client";

import React from "react";
import { useAlarmContext } from "../_components/AlarmContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const StopAlarmPage = () => {
    const { toggleAlarm } = useAlarmContext();
    const router = useRouter();
    const searchParams = useSearchParams(); // クエリパラメータを取得
    const alarmId = searchParams.get("id") ? parseInt(searchParams.get("id")!) : null;

    const handleStop = () => {
        if (alarmId !== null) {
            toggleAlarm(alarmId); // アラームを停止する
        }
        router.push("/alarm"); // 一覧画面に戻る
    };

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-4">アラームが鳴っています！</h2>
            <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded">
                アラームを止める
            </button>
        </div>
    );
};

export default StopAlarmPage;
