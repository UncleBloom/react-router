import * as React from "react";
import type { History, Location } from "history";
import { Action as NavigationType } from "history";

import type { RouteMatch } from "./router";

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */
export type Navigator = Pick<History, "go" | "push" | "replace" | "createHref">;

interface NavigationContextObject {
  basename: string;
  navigator: Navigator;
  static: boolean;
}

// 内部含有 navigator 对象的全局上下文
export const NavigationContext = React.createContext<NavigationContextObject>(
  null!
);

if (__DEV__) {
  NavigationContext.displayName = "Navigation";
}

interface LocationContextObject {
  location: Location;
  navigationType: NavigationType;
}

// 内部含有当前 location 和 action，一般用于在内部获取当前 location
export const LocationContext = React.createContext<LocationContextObject>(
  null!
);

if (__DEV__) {
  LocationContext.displayName = "Location";
}

interface RouteContextObject {
  // 内部含有所有子路由组成的聚合组件，一个 ReactElement
  outlet: React.ReactElement | null;
  // 一个成功匹配到的路由数组，索引从小到大层级变深
  matches: RouteMatch[];
}

export const RouteContext = React.createContext<RouteContextObject>({
  outlet: null,
  matches: [],
});

if (__DEV__) {
  RouteContext.displayName = "Route";
}
