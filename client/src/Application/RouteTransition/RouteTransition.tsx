import React from "react";
import { animated, config, useTransition } from "react-spring";

import useRoute, { Route } from "../../Router/useRoute";
import "./RouteTransition.css";

interface RouteTransitionProps {
  children: (value: any) => React.ReactNode;
  path: string;
}

function RouteTransition({ children, path }: RouteTransitionProps) {
  const route = useRoute(path);

  const transitions = useTransition(route, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} className="RouteTransition" style={props}>
              {children(item)}
            </animated.div>
          )
      )}
    </>
  );
}

export default RouteTransition;
