import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours   = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm    = hours >= 12 ? "PM" : "AM";
  const hour12  = (hours % 12 || 12).toString().padStart(2, "0");

  const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[time.getDay()];
  const date    = time.getDate();
  const month   = months[time.getMonth()];
  const year    = time.getFullYear();

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
      {/* Time */}
      <div className="flex items-center gap-1">
        <FiClock className="text-green-400 text-sm" />
        <span className="text-white font-mono font-bold text-sm tracking-wider">
          {hour12}:{minutes}
          <span className="text-green-400">:{seconds}</span>
        </span>
        <span className="text-white/50 text-xs font-bold ml-0.5">{ampm}</span>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-white/20"></div>

      {/* Date */}
      <div className="text-white/70 text-xs font-semibold">
        {dayName}, {date} {month} {year}
      </div>
    </div>
  );
};

export default Clock;