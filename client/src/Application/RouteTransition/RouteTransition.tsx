import React from "react";
import { animated, config, useTransition } from "react-spring";

import useRoute from "../../Router/useRoute";
import "./RouteTransition.css";

interface RouteTransitionProps extends React.AllHTMLAttributes<HTMLElement> {
  path: string;
}

function RouteTransition({ children, path }: RouteTransitionProps) {
  const route = useRoute(path);

  const transitions = useTransition(route, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="RouteTransition" key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
}

export default RouteTransition;
