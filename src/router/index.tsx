import React, { Fragment } from "react";
import {Switch} from 'react-router-dom'
import { routes, authRoutes } from "./routes";

export const AuthRouter = () => (
  <Switch>
    {authRoutes.map((_route, _index) => (
      <_route.route {..._route} key={_index} />
    ))}
  </Switch>
);

export default () => (
  <Switch>
    {routes.map((_route, _index) => (
      <_route.route {..._route} key={_index} />
    ))}
  </Switch>
);
