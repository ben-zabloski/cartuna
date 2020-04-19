import { RouterContext, RouterContextInterface } from "./Router";
import { useContext, useEffect, useState } from "react";

type Params = Record<string, string>;

interface Route extends RouterContextInterface {
  params: Params;
}

function useRoute(path: string): Route | null {
  const routerContext = useContext(RouterContext);
  const [route, setRoute] = useState<Route>();

  useEffect(() => {
    const paramNames: Array<string> = path
      .split("/")
      .map((name) => (name.startsWith(":") ? name.slice(1) : name));

    if (!paramNames) {
      setRoute(undefined);
      return;
    }

    const paramValues = routerContext.location.pathname.split("/");
    if (!paramValues) {
      setRoute(undefined);
      return;
    }

    if (paramNames.length !== paramValues.length) {
      setRoute(undefined);
      return;
    }

    const params: Params = {};
    for (let i = 1; i < paramNames.length && i < paramValues.length; ++i) {
      if (paramNames[i] === paramValues[i]) continue;
      params[paramNames[i]] = paramValues[i];
    }

    setRoute({
      location: routerContext.location,
      params,
      pushState: routerContext.pushState,
    });
  }, [path, routerContext]);

  return route ? route : null;
}

export default useRoute;
