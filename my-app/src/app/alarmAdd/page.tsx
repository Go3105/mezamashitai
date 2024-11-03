import React from "react";
import AlarmAdd from "../_components/AlarmAdd";
import Tab from "../_components/Tab";

const page = () => {
  return (
    <div>
      <Tab />
      <h2 className="text-center text-2xl p-6 font-bold">アラーム追加</h2>
      <AlarmAdd />
    </div>
  );
};

export default page;
