import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimezones } from "../../api/fetchTimezones";
import { setClocks } from "../../store/actions";
import { Clock } from "../Clock/Clock";
import { RootState } from "../../types/types";
import { AppDispatch } from "../../store/store";
import "./clockContainer.css";
import notify from "../../utils/notify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ClockContainer = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const { clocks, timezones } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  useEffect(() => {
    if (timezones.length > 0) {
      setLoading(false);
    }
  }, [timezones]);

  const handleAddClock = () => {
    if (clocks.length < 10) {
      const availableTimezones = timezones.filter(
        (tz) =>
          !clocks.some((clock) => clock.timezone === tz.timezone.toString())
      );

      if (availableTimezones.length > 0) {
        const newClockId = (clocks.length + 1).toString();
        dispatch(
          setClocks([
            ...clocks,
            {
              id: newClockId,
              timezone: availableTimezones[0].timezone.toString(),
            },
          ])
        );
      } else {
        notify("Ошибка", "Все доступные часовые пояса уже выбраны", "danger");
      }
    } else {
      notify(
        "Ошибка",
        "Одновременно может быть максимум 10 циферблатов",
        "danger"
      );
    }
  };

  const handleRemoveClock = (id: string) => {
    if (clocks.length > 1) {
      dispatch(setClocks(clocks.filter((clock) => clock.id !== id)));
    } else {
      notify("Ошибка", "Необходимо, чтобы был хотя бы 1 циферблат", "danger");
    }
  };

  const handleTimezoneChange = (id: string, timezone: number) => {
    dispatch(
      setClocks(
        clocks.map((clock) =>
          clock.id === id ? { ...clock, timezone: timezone.toString() } : clock
        )
      )
    );
  };

  return (
    <div>
      <button className="button-add-clock" onClick={handleAddClock}>
        Добавить часы
      </button>
      <div className="clocks-container">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="clock-item">
                <Skeleton width={200} height={200} borderRadius={8} />
                <Skeleton width={200} height={30} borderRadius={6} />
                <Skeleton width={80} height={25} borderRadius={5} />
              </div>
            ))
          : clocks.map((clock) => {
              const availableTimezones = timezones.filter(
                (tz) =>
                  tz.timezone.toString() === clock.timezone ||
                  !clocks.some((c) => c.timezone === tz.timezone.toString())
              );

              return (
                <div key={clock.id} className="clock-item">
                  <Clock id={clock.id} timezone={clock.timezone} />
                  <select
                    className="select-timezone"
                    onChange={(e) =>
                      handleTimezoneChange(clock.id, Number(e.target.value))
                    }
                    value={clock.timezone}
                  >
                    {availableTimezones.map((timezone) => (
                      <option
                        key={`${timezone.city}-${timezone.timezone}`}
                        value={timezone.timezone}
                      >
                        {timezone.city} (UTC
                        {timezone.timezone > 0
                          ? `+${timezone.timezone}`
                          : timezone.timezone}
                        )
                      </option>
                    ))}
                  </select>
                  <button
                    className="button-remove"
                    onClick={() => handleRemoveClock(clock.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};
