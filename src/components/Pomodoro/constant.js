export const TIMER_SETTINGS = {
  Pomodoro: { time: 25 * 60 },
  "Short Break": { time: 5 * 60 },
  "Long Break": { time: 15 * 60 },
};

export const formatTime = time => {
  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");

  return `${mins}:${secs}`;
};
