"use client";
import React from "react";
import CalendarMonthView from "../_components/CalendarMonthView";
import Tab from "../_components/Tab";

const page = () => {
  return (
    <div>
      <Tab />
      <h2 className="text-center text-2xl p-6 font-bold">カレンダー</h2>
      <CalendarMonthView />
    </div>
  );
};

export default page;
