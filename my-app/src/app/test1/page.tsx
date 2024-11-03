"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/today_events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });
        const data = await response.json();
        setResponseData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.log(responseData);
  };

  return <div onClick={handleClick}>page</div>;
};

export default Page;
