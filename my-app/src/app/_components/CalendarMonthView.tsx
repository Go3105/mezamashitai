"use client";
import React, { useState, useEffect } from "react";

type DateInfo = {
  year: number;
  month: number;
  day?: number;
};

type Event = {
  title: string;
  description?: string;
  startTime?: string; // 開始時刻（例: "10:00"）、終日イベントの場合は undefined
  endTime?: string; // 終了時刻（例: "11:00"）、終日イベントの場合は undefined
};

const events: { [key: string]: Event[] } = {
  "2024-11-03": [
    {
      title: "会議",
      description: "プロジェクトAの進捗",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      title: "出張",
      description: "大阪へ出張",
      startTime: "13:00",
      endTime: "17:00",
    },
    {
      title: "誕生日",
      description: "友達の誕生日",
    },
  ],
  "2024-11-05": [
    {
      title: "出張",
      description: "大阪へ出張",
      startTime: "09:00",
      endTime: "17:00",
    },
  ],
  "2024-11-06": [
    {
      title: "会議",
      description: "プロジェクトAの進捗",
      startTime: "15:00",
      endTime: "16:00",
    },
  ],
};

export default function Home() {
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

  useEffect(() => {
    generateCalendar(currentDate.year, currentDate.month);
  }, [currentDate]);

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

  const changeMonth = (offset: number): void => {
    setCurrentDate(({ year, month }) => {
      const newMonth = month + offset;
      return {
        year: newMonth < 1 ? year - 1 : newMonth > 12 ? year + 1 : year,
        month: newMonth < 1 ? 12 : newMonth > 12 ? 1 : newMonth,
      };
    });
  };

  const highlightToday = (date: number | null) =>
    date === today.day &&
    currentDate.year === today.year &&
    currentDate.month === today.month;

  // イベントの取得、ソート（時刻順）および「…」の表示を追加
  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const eventsForDay = events[dateKey] || [];

    // 時刻順にソート（終日イベントを優先し、時間の早い順）
    const sortedEvents = eventsForDay.sort((a, b) => {
      if (!a.startTime) return -1; // aが終日イベントの場合、先に表示
      if (!b.startTime) return 1; // bが終日イベントの場合、後に表示
      return a.startTime.localeCompare(b.startTime); // 時間の早い順
    });

    const hasMore = sortedEvents.length > 2; // 3件以上あるか確認
    return { events: sortedEvents.slice(0, 2), hasMore };
  };

  return (
    <div className="flex flex-col items-center text-gray-800">
      <div className="flex items-center mb-6 space-x-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition"
        >
          &lt;
        </button>
        <h2 className="text-2xl font-semibold text-gray-700 tracking-wide">
          {currentDate.year}年 {currentDate.month}月
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition"
        >
          &gt;
        </button>
      </div>

      <table className="table-fixed border-collapse w-full max-w-5xl">
        <thead>
          <tr>
            {["日", "月", "火", "水", "木", "金", "土"].map((dayName) => (
              <th
                key={dayName}
                className="py-3 text-sm font-semibold text-gray-600"
              >
                {dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => (
            <tr key={index}>
              {week.map((date, idx) => (
                <td
                  key={idx}
                  className="border h-[128px] w-[40px] p-2 align-top bg-white"
                  style={{ width: "14.2857%" }}
                >
                  <div className="flex flex-col items-center w-full max-w-full">
                    <span
                      className={`text-xs font-medium ${
                        highlightToday(date)
                          ? "text-white bg-blue-500"
                          : "text-gray-500"
                      } ${
                        highlightToday(date) ? "rounded-full px-2 py-1" : ""
                      }`}
                    >
                      {date || ""}
                    </span>
                    {date &&
                      (() => {
                        const { events, hasMore } = getEventsForDate(
                          currentDate.year,
                          currentDate.month,
                          date
                        );
                        return (
                          <>
                            {events.map((event, eventIdx) => (
                              <div
                                key={eventIdx}
                                className="mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md shadow overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-full"
                                style={{ display: "inline-block" }}
                              >
                                {event.title}
                              </div>
                            ))}
                            {hasMore && (
                              <span className="text-lg text-gray-500">…</span>
                            )}
                          </>
                        );
                      })()}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
