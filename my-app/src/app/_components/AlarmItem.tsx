import React from "react";
import { MdDelete } from "react-icons/md"; // 削除アイコンとして使用

type AlarmItemProps = {
  alarm: {
    id: number;
    name: string;
    time: string;
    isActive: boolean;
    remind: boolean; // リマインド設定を追加
  };
  onToggle: () => void;
  onDelete: () => void;
};

export default function AlarmItem({
  alarm,
  onToggle,
  onDelete,
}: AlarmItemProps) {
  const handleDelete = () => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <li className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-start flex-col space-x-4">
        {/* 時刻を強調したバッジ */}
        <span className="bg-blue-100 text-blue-800 text-3xl font-bold px-4 py-2 rounded-lg shadow-sm ">
          {alarm.time}
        </span>
        {/* アラーム名 */}
        <div className="flex-1 mt-1">
          <span className="block text-gray-700 font-medium text-sm ">
            {alarm.name}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* リマインド情報を表示 */}
        {alarm.remind && (
          <span className="mt-1 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
            リマインド有効
          </span>
        )}
        {/* トグルスイッチとON/OFFラベル */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={alarm.isActive}
            onChange={onToggle}
            className="w-6 h-6 text-blue-500 rounded focus:ring focus:ring-blue-200"
          />
          <span
            className={`font-semibold ${
              alarm.isActive ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {alarm.isActive ? "ON" : "OFF"}
          </span>
        </label>
        {/* 削除ボタン */}
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete alarm"
        >
          <MdDelete className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
}
