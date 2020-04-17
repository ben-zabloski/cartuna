import React, { useEffect, useCallback, useState } from "react";

import "./Image.css";
import { useTransition, config, animated, useSpring } from "react-spring";

interface ImageProps {
  src: string | undefined;
}

function ImageElement({ src }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoadHandler = useCallback((event) => {
    setLoaded(true);
  }, []);

  const onErrorHandler = useCallback((event) => {
    setError(true);
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <animated.img
      src={error ? undefined : src}
      onLoad={onLoadHandler}
      onError={onErrorHandler}
      style={spring}
    />
  );
}

function Image({ src, ...props }: ImageProps) {
  const transitions = useTransition(src, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  console.log("img transitions:", src, transitions);

  return (
    <div className="Image" {...props}>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <ImageElement src={src} />
            </animated.div>
          )
      )}
    </div>
  );
}

export default Image;
