import { RouterContext, RouterContextInterface } from "./Router";
import { useContext, useEffect, useState } from "react";

type Params = Record<string, string>;
interface Route extends RouterContextInterface {
  params: Params;
}

function useRoute(route: string): Route | null {
  const routerContext = useContext(RouterContext);
  const [params, setParams] = useState<Params>();

  useEffect(() => {
    const paramNames: Array<string> = route
      .split("/")
      .map((name) => (name.startsWith(":") ? name.slice(1) : name));

    if (!paramNames) {
      setParams(undefined);
      return;
    }

    const paramValues = routerContext.location.pathname.split("/");
    if (!paramValues) {
      setParams(undefined);
      return;
    }

    if (paramNames.length !== paramValues.length) {
      setParams(undefined);
      return;
    }

    const params: Params = {};
    for (let i = 1; i < paramNames.length && i < paramValues.length; ++i) {
      if (paramNames[i] === paramValues[i]) continue;
      params[paramNames[i]] = paramValues[i];
    }

    setParams(params);
  }, [route, routerContext]);

  if (!params) return null;

  return {
    location: routerContext.location,
    params,
    pushState: routerContext.pushState,
  };
}

export default useRoute;
