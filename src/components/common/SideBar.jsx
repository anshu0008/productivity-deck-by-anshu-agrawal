import React from "react";

import classNames from "classnames";
import { Book, Globe, List, TimeTracking } from "neetoicons";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { routes } from "routes";

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex w-20 flex-col items-center space-y-6 py-6 text-white">
      <div className="rounded-lg bg-gray-800 p-2 text-2xl font-bold">
        <Book />
      </div>
      <NavLink
        to={routes.Kanban.index}
        className={classNames({
          "text-blue-400": pathname === routes.Kanban.index,
          "text-gray-400": pathname !== routes.Kanban.index,
        })}
      >
        <List />
      </NavLink>
      <NavLink
        to={routes.Kanban.pomodoro}
        className={classNames({
          "text-blue-400": pathname === routes.Kanban.pomodoro,
          "text-gray-400": pathname !== routes.Kanban.pomodoro,
        })}
      >
        <TimeTracking />
      </NavLink>
      <NavLink
        to={routes.Kanban.news}
        className={classNames({
          "text-blue-400": pathname === routes.Kanban.news,
          "text-gray-400": pathname !== routes.Kanban.news,
        })}
      >
        <Globe />
      </NavLink>
    </div>
  );
};

export default SideBar;
