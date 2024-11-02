"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App RouterではuseRouterをnext/navigationからインポート

type DateInfo = {
  year: number;
  month: number;
  day?: number;
};

type Event = {
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
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
      title: "会議2",
      description: "プロジェクトBの進捗",
      startTime: "10:30",
      endTime: "11:30",
    },
    {
      title: "会議3",
      description: "プロジェクトBの進捗",
      startTime: "10:50",
      endTime: "13:30",
    },
    {
      title: "出張",
      description: "大阪へ出張",
      startTime: "13:00",
      endTime: "17:00",
    },
    { title: "誕生日", description: "友達の誕生日" },
  ],
  "2024-11-04": [
    {
      title: "週次ミーティング",
      description: "全体進捗報告",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      title: "ランチミーティング",
      description: "チームビルディング",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      title: "英語レッスン",
      description: "会話練習",
      startTime: "18:00",
      endTime: "19:00",
    },
  ],
  "2024-11-05": [
    {
      title: "プロジェクトレビュー",
      description: "開発の進捗確認",
      startTime: "10:00",
      endTime: "11:30",
    },
    {
      title: "ランニング",
      description: "夕方の運動",
      startTime: "17:00",
      endTime: "18:00",
    },
    { title: "映画鑑賞", description: "新作映画を観る" },
  ],
  "2024-11-06": [
    {
      title: "顧客訪問",
      description: "新製品の説明",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      title: "リサーチ",
      description: "次のプロジェクトの準備",
      startTime: "16:30",
      endTime: "18:00",
    },
    { title: "家族とのディナー", description: "誕生日のお祝い" },
  ],
  "2024-11-07": [
    {
      title: "カンファレンス参加",
      description: "技術トレンドの講演",
      startTime: "09:00",
      endTime: "12:00",
    },
    {
      title: "ランチ",
      description: "同僚と外食",
      startTime: "12:30",
      endTime: "13:30",
    },
    {
      title: "会議",
      description: "プロジェクトCの進捗",
      startTime: "15:00",
      endTime: "16:00",
    },
  ],
  "2024-11-08": [
    {
      title: "マーケティングミーティング",
      description: "新製品の広告戦略",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      title: "ワークショップ",
      description: "スキルアップのためのトレーニング",
      startTime: "14:00",
      endTime: "17:00",
    },
    { title: "読書", description: "新しい本を読む" },
  ],
  "2024-11-09": [
    {
      title: "サッカー観戦",
      description: "地元チームの応援",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      title: "ショッピング",
      description: "日用品の買い物",
      startTime: "13:00",
      endTime: "15:00",
    },
    {
      title: "友人とディナー",
      description: "久しぶりの再会",
      startTime: "18:30",
      endTime: "21:00",
    },
  ],
};

export default function Home() {
  const router = useRouter();
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

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const eventsForDay = events[dateKey] || [];
    const sortedEvents = eventsForDay.sort((a, b) => {
      if (!a.startTime) return -1;
      if (!b.startTime) return 1;
      return a.startTime.localeCompare(b.startTime);
    });

    const hasMore = sortedEvents.length > 2;
    return { events: sortedEvents.slice(0, 2), hasMore };
  };

  const handleDateClick = (day: number) => {
    // 日付クリックで日表示ページに遷移
    router.push(`/calendar/${currentDate.year}/${currentDate.month}/${day}`);
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
                  onClick={() => date && handleDateClick(date)} // 日付クリックで日表示ページへ遷移
                  className="border h-[128px] w-[40px] p-2 align-top bg-white cursor-pointer"
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
