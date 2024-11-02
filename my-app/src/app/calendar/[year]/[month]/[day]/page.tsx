"use client";
import Tab from "@/app/_components/Tab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

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

function getTimeInMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

type PositionedEvent = Event & {
  topPosition: number;
  eventHeight: number;
};

export default function Page({
  params: paramsPromise,
}: {
  params: Promise<{ year: string; month: string; day: string }>;
}) {
  // 非同期の `params` をアンラップ
  const params = use(paramsPromise);
  const { year, month, day } = params;
  const router = useRouter();
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const handleNavigation = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const newDay = String(newDate.getDate()).padStart(2, "0");

    router.push(`/calendar/${newYear}/${newMonth}/${newDay}`);
  };

  const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  const eventsForDay = events[dateKey] || [];

  const allDayEvents = eventsForDay.filter(
    (event) => !event.startTime && !event.endTime
  );
  const timedEvents = eventsForDay.filter(
    (event) => event.startTime && event.endTime
  );

  const eventsWithPosition: PositionedEvent[] = timedEvents.map((event) => {
    const startTime = getTimeInMinutes(event.startTime!);
    const endTime = getTimeInMinutes(event.endTime!);
    const topPosition = (startTime / 60) * 4;
    const eventHeight = ((endTime - startTime) / 60) * 4;

    return { ...event, topPosition, eventHeight };
  });

  const layoutEvents = (events: PositionedEvent[]): PositionedEvent[][] => {
    const columns: PositionedEvent[][] = [];

    events.forEach((event) => {
      let placed = false;
      for (const column of columns) {
        if (
          !column.some(
            (colEvent) =>
              colEvent.topPosition < event.topPosition + event.eventHeight &&
              event.topPosition < colEvent.topPosition + colEvent.eventHeight
          )
        ) {
          column.push(event);
          placed = true;
          break;
        }
      }
      if (!placed) columns.push([event]);
    });

    return columns;
  };

  const eventColumns = layoutEvents(eventsWithPosition);

  return (
    <div>
      <Tab />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => handleNavigation(-1)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 transition"
          >
            前日
          </button>
          <Link href="/calendar" className="text-blue-500 hover:underline">
            月表示に戻る
          </Link>
          <button
            onClick={() => handleNavigation(1)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 transition"
          >
            次日
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {year}年{month}月{day}日
        </h2>

        {/* 終日イベントの表示 */}
        {allDayEvents.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">終日イベント</h3>
            <div className="flex flex-wrap gap-2">
              {allDayEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 text-yellow-800 rounded-lg shadow p-2 text-xs w-full max-w-sm"
                >
                  <h3 className="font-semibold">{event.title}</h3>
                  {event.description && <p>{event.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full border-l border-gray-200 h-[80vh] overflow-y-scroll">
          {/* 時間軸 */}
          <div className="absolute left-0 top-0 w-12">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="h-16 text-xs text-gray-500 border-t border-gray-200"
              >
                {i}:00
              </div>
            ))}
          </div>

          {/* イベントのタイムテーブル */}
          <div className="ml-12 relative">
            {eventColumns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="absolute"
                style={{
                  width: `${100 / eventColumns.length}%`,
                  left: `${(100 / eventColumns.length) * colIndex}%`,
                }}
              >
                {column.map((event, index) => (
                  <div
                    key={index}
                    className="absolute bg-blue-100 rounded-lg shadow p-2 text-blue-700 text-xs overflow-hidden"
                    style={{
                      top: `${event.topPosition}rem`,
                      height: `${event.eventHeight}rem`,
                      width: "95%", // 幅を揃える
                    }}
                  >
                    <h3 className="font-semibold">{event.title}</h3>
                    {event.description && <p>{event.description}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
