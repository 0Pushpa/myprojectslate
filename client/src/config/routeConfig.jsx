import { Switch, Route, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import React from "react";

export default function RouteConfig() {
  return (
    <Switch>
      {Routes().map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
}

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isLoggedIn ? (
          route.isLoggedIn === "permit" ? (
            <route.component {...props} routes={route.routes} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <route.component {...props} routes={route.routes} />
        )
      }
    />
  );
}
