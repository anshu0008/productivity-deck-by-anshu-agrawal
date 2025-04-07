import React, { useState, useEffect, useRef } from "react";

import { Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { formatTime } from "./constant";

const Timer = ({ settings, setActiveTab, activeTab }) => {
  const { time } = settings;
  const [timeLeft, setTimeLeft] = useState(time || 0);
  const [isRunning, setIsRunning] = useState({
    check: false,
    mode: "Pomodoro",
  });
  const intervalRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (isRunning.check) {
      intervalRef.current = setInterval(() => {
        if (timeLeft < 1) {
          if (activeTab === "Pomodoro") {
            setActiveTab("Short Break");
          }

          if (activeTab === "Short Break") {
            setActiveTab("Long Break");
          }

          if (activeTab === "Long Break") {
            setActiveTab("Pomodoro");

            setIsRunning(false);
          }
        }

        setTimeLeft(prev => {
          if (prev < 1) {
            clearInterval(intervalRef.current);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, activeTab, timeLeft]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(time);
    setIsRunning(prev => ({ ...prev, check: false }));
  };

  return (
    <div className="flex h-2/3 w-full flex-col items-center justify-evenly">
      <h1 className="mb-8 text-7xl font-extrabold">{formatTime(timeLeft)}</h1>
      <div className="flex gap-x-4">
        <Button
          disabled={timeLeft === 0}
          label={isRunning.check ? t("pomodoro.stop") : t("pomodoro.start")}
          style="secondary"
          onClick={() =>
            setIsRunning(prev => ({ ...prev, check: !prev.check }))
          }
        />
        <Button
          label={t("pomodoro.reset")}
          style="secondary"
          onClick={handleReset}
        />
      </div>
    </div>
  );
};

export default Timer;
