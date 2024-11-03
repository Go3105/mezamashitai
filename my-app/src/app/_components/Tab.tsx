// Tab.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Tab = () => {
  const pathname = usePathname();

  // 現在のページに基づいてアイコンを切り替え
  const isCalendarPage = pathname.startsWith("/calendar");
  const isAlarmPage = pathname === "/alarm" || pathname === "/alarmAdd";

  return (
    <div className="flex justify-center items-center h-[76px] shadow">
      <ul className="w-[240px] h-full flex justify-center items-center">
        <Link
          href="/calendar"
          className={`hover:bg-red-50 w-full h-full flex justify-center `}
        >
          <Image
            src={isCalendarPage ? "/red_calendar.svg" : "/gray_calendar.svg"}
            alt="calendar icon"
            width={48}
            height={48}
          />
        </Link>
      </ul>
      <ul className="w-[240px] h-full flex justify-center items-center">
        <Link
          href="/alarm"
          className={`hover:bg-red-50 w-full h-full flex justify-center `}
        >
          <Image
            src={isAlarmPage ? "/red_alarm_v2.svg" : "/gray_alarm_v2.svg"}
            alt="alarm icon"
            width={48}
            height={48}
          />
        </Link>
      </ul>
    </div>
  );
};

export default Tab;
