import React from "react";
import AlarmList from "../_components/AlarmList";
import Link from "next/link";
import Tab from "../_components/Tab";

export default function AlarmPage() {
  return (
    <div className="">
      <Tab />
      <div className="max-w-lg mx-auto text-center p-8">
        <h2 className="text-center text-2xl p-6 font-bold">アラーム</h2>
        <Link href="/alarmAdd">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold   ">
            新規作成 ＋
          </button>
        </Link>
      </div>
      <div className="">
        <AlarmList />
      </div>
    </div>
  );
}
