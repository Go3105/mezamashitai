"use client";
import React, { useState, useEffect } from "react";
type DateInfo = {
  year: number;
  month: number;
  day?: number; // dayはオプショナルに設定（今月以外では不要）
};
export default function CalendarMonthView() {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const [calendar, setCalendar] = useState<(number | null)[][]>([]);
  const [currentDate, setCurrentDate] = useState<DateInfo>({
    year: today.year,
    month: today.month,
  });
  // 現在の年月を基にカレンダーを生成
  useEffect(() => {
    generateCalendar(currentDate.year, currentDate.month);
  }, [currentDate]);
  // カレンダーを生成する関数
  const generateCalendar = (year: number, month: number): void => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    const weeks = Array.from(
      { length: Math.ceil((firstDay + lastDay) / 7) },
      (_, i) => {
        return Array.from({ length: 7 }, (_, j) => {
          const date = i * 7 + j - firstDay + 1;
          return date > 0 && date <= lastDay ? date : null;
        });
      }
    );
    setCalendar(weeks);
  };
  // 月を切り替える関数
  const changeMonth = (offset: number): void => {
    setCurrentDate(({ year, month }) => {
      const newMonth = month + offset;
      return {
        year: newMonth < 1 ? year - 1 : newMonth > 12 ? year + 1 : year,
        month: newMonth < 1 ? 12 : newMonth > 12 ? 1 : newMonth,
      };
    });
  };
  // 当日のハイライトを設定
  const highlightToday = (date: number | null) =>
    date === today.day &&
    currentDate.year === today.year &&
    currentDate.month === today.month;
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center mb-4">
        {/* 前月ボタン */}
        <button
          onClick={() => changeMonth(-1)}
          className="px-3 py-1 bg-gray-300 rounded mr-4"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.year}年 {currentDate.month}月
        </h2>
        {/* 次月ボタン */}
        <button
          onClick={() => changeMonth(1)}
          className="px-3 py-1 bg-gray-300 rounded ml-4"
        >
          &gt;
        </button>
      </div>
      <table className="table-auto border-collapse w-full max-w-md">
        <thead>
          <tr>
            {["日", "月", "火", "水", "木", "金", "土"].map((dayName) => (
              <th key={dayName} className="bg-blue-600 text-white py-2">
                {dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => (
            <tr key={index} className="text-center">
              {week.map((date, idx) => (
                <td
                  key={idx}
                  className={`border h-12 ${
                    highlightToday(date)
                      ? "bg-blue-600 text-white rounded-full"
                      : ""
                  }`}
                >
                  {date || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
