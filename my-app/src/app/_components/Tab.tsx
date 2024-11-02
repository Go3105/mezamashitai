import Image from "next/image";
import Link from "next/link";
import React from "react";

const Tab = () => {
  return (
    <div className="flex justify-center space-x-8 items-center h-[76px] shadow">
      <ul className="w-[200px] h-full flex justify-center items-center">
        <Link
          href="/calendar"
          className="hover:bg-red-50 w-full h-full flex justify-center"
        >
          <Image src="/red_calendar.svg" alt="logo" width={48} height={48} />
        </Link>
      </ul>
      <ul className="w-[200px] h-full flex justify-center items-center">
        <Link
          href="/alarm"
          className="hover:bg-red-50 w-full h-full flex justify-center"
        >
          <Image src="/gray_alarm.svg" alt="logo" width={48} height={48} />
        </Link>
      </ul>
    </div>
  );
};

export default Tab;
