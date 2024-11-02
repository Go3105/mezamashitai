import React from "react";
import AlarmList from "../_components/AlarmList";
import AlarmAdd from "../_components/AlarmAdd";
import Link from "next/link";

export default function AlarmPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">アラーム</h1>
        <Link href="/alarm/alarmAddPage">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">アラームを新規作成 ＋</button>
        </Link>
      </div>
      <AlarmList />
    </div>
  );
}
