import React, { useEffect, useState } from "react";
import "./clock.css";

type ClockProps = {
  id: string;
  timezone: string;
};

export const Clock: React.FC<ClockProps> = ({ id, timezone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const localTime = new Date();
      const offset = new Date().getTimezoneOffset() / 60;
      const adjustedTime = new Date(
        localTime.setHours(localTime.getHours() + offset + parseInt(timezone))
      );
      setTime(adjustedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // вывод строки часов
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // генерация часовых штрихов
  const hourTicks = Array.from({ length: 12 }, (_, index) => (
    <div
      key={index}
      className="hour-tick"
      style={{
        left: 98,
        top: 90,
        transform: `rotate(${index * 30}deg) translateX(90px) rotate(90deg)`,
      }}
    />
  ));

  return (
    <div className="watch">
      <div className="clock">
        <div className="clock-face">
          {hourTicks}
          <div
            className="hand hour-hand"
            style={{
              transform: `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`,
            }}
          ></div>
          <div
            className="hand minute-hand"
            style={{ transform: `rotate(${minutes * 6}deg)` }}
          ></div>
          <div
            className="hand second-hand"
            style={{ transform: `rotate(${seconds * 6}deg)` }}
          ></div>
        </div>
      </div>
      <div className="time-display">{formattedTime}</div>
    </div>
  );
};
