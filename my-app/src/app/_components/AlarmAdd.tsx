"use client";
import React, { useState } from "react";
import { useAlarmContext } from "./AlarmContext";
import { useRouter } from "next/navigation";

const AlarmAdd = () => {
  const [name, setName] = useState("アラーム");
  const [time, setTime] = useState("00:00");
  const [sound, setSound] = useState("default");
  const [remind, setRemind] = useState(false);

  const { addAlarm } = useAlarmContext();
  const router = useRouter();

  const handleSave = () => {
    addAlarm({
      id: 0,
      name,
      time,
      sound,
      remind,
      isActive: true,
    });
    router.push("/alarm");
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          時間を設定する
        </h2>

        {/* 時間ピッカー */}
        <div className="text-center mb-6">
          <label
            htmlFor="time"
            className="block mb-3 text-gray-700 font-medium text-lg"
          ></label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border-2 border-gray-300 rounded-xl p-5 bg-gray-100 text-gray-800 text-5xl font-semibold text-center focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:bg-gray-200"
          />
        </div>

        {/* アラーム名 */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-gray-700 font-medium text-lg"
          >
            アラーム名
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 rounded-xl p-4 w-full bg-gray-100 text-gray-800 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="アラーム名を入力"
          />
        </div>

        {/* サウンドの設定 */}
        <div>
          <label
            htmlFor="sound"
            className="block mb-2 text-gray-700 font-medium text-lg"
          >
            サウンド設定
          </label>
          <select
            id="sound"
            value={sound}
            onChange={(e) => setSound(e.target.value)}
            className="border-2 border-gray-300 rounded-xl p-4 w-full bg-gray-100 text-gray-800 text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:bg-gray-200"
          >
            <option value="default">デフォルト</option>
            <option value="beep">ビープ音</option>
            <option value="ring">着信音</option>
          </select>
        </div>

        {/* リマインドの設定 */}
        <div className="flex items-center space-x-3 mt-4">
          <label className="flex items-center space-x-3 text-gray-700 font-medium text-lg">
            <input
              type="checkbox"
              checked={remind}
              onChange={() => setRemind(!remind)}
              className="w-6 h-6 text-blue-500 rounded focus:ring focus:ring-blue-300"
            />
            <span>リマインドを有効にする</span>
          </label>
        </div>

        {/* 保存ボタン */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default AlarmAdd;
