import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import "./Spinner.css";

interface SpinnerProps {
  delay?: number;
  show: boolean;
}

function Spinner({ delay = 10, show }: SpinnerProps) {
  const [enabled, setEnabled] = useState(false);

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const spring = useSpring({ opacity: enabled ? 1 : 0 });

  useEffect(() => {
    if (show === enabledRef.current) return;

    if (show === false) {
      setEnabled(false);
      return;
    }

    const timeout = setTimeout(() => {
      setEnabled(show);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, show]);

  return <animated.div className="Spinner" style={spring} />;
}

export default Spinner;
