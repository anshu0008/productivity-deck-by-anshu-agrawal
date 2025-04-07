import { t } from "i18next";

export const TIMER_SETTINGS = {
  [t("pomodoro.timerSetting.pomodoro")]: { time: 25 * 60 },
  [t("pomodoro.timerSetting.shortBreak")]: { time: 5 * 60 },
  [t("pomodoro.timerSetting.longBreak")]: { time: 15 * 60 },
};

export const formatTime = time => {
  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");

  return `${mins}:${secs}`;
};
