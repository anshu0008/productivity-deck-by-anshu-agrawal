import React from "react";

import { SideBar } from "components/common";
import { Kanban } from "components/Kanban";
import { News } from "components/News";
import { Pomodoro } from "components/Pomodoro";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "routes";

const App = () => (
  <div className="flex h-screen">
    <SideBar />
    <div className="flex-1 overflow-hidden bg-gray-100 p-4">
      <Switch>
        <Route exact component={Kanban} path={routes.Kanban.index} />
        <Route exact component={Pomodoro} path={routes.Kanban.pomodoro} />
        <Route exact component={News} path={routes.Kanban.news} />
        <Redirect exact from={routes.root} to={routes.Kanban.index} />
      </Switch>
    </div>
  </div>
);

export default App;
