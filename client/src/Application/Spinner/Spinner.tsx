import React, { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

import "./Spinner.css";

interface SpinnerProps {
  delay?: number;
  show: boolean;
}

function Spinner({ delay = 100, show }: SpinnerProps) {
  const [enabled, setEnabled] = useState(false);

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const transitions = useTransition(enabled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    if (show === false) {
      setEnabled(false);
      return;
    }

    if (show === enabledRef.current) return;

    const timeout = setTimeout(() => {
      setEnabled(show);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, show]);

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && <animated.div key={key} className="Spinner" style={props} />
      )}
    </>
  );
}

export default Spinner;
