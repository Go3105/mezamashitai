"use client";

import React from "react";
import AlarmList from "../_components/AlarmList";
import Link from "next/link";
import Tab from "../_components/Tab";
import { useAlarmContext } from "../_components/AlarmContext";

export default function AlarmPage() {
    const { alarms } = useAlarmContext();

    return (
        <div>
            <Tab />
            <h1 className="text-center text-2xl p-6 font-bold">アラーム</h1>
            <Link href="/alarmAdd">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    アラームを新規作成 ＋
                </button>
            </Link>
            <AlarmList alarms={alarms} />
        </div>
    );
}
