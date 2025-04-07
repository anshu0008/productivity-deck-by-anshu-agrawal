import { useState } from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { TIMER_SETTINGS } from "./constant";
import Tabs from "./Tabs";
import Timer from "./Timer";

const Pomodoro = () => {
  const [activeTab, setActiveTab] = useState("Pomodoro");
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col gap-10 p-7">
      <Typography className="mb-4" style="h1" weight="bold">
        {t("pomodoro.title")}
      </Typography>
      <div className="flex h-full w-full items-start justify-center">
        <div className="flex h-3/5 w-2/5 flex-col justify-start gap-10 rounded-lg bg-white px-10 shadow-md">
          <Tabs {...{ activeTab, setActiveTab }} settings={TIMER_SETTINGS} />
          <Timer
            settings={TIMER_SETTINGS[activeTab]}
            {...{ setActiveTab, activeTab }}
          />
        </div>
      </div>
    </div>
  );
};
export default Pomodoro;
