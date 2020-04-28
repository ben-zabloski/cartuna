import React, { useCallback, useState } from "react";

import "./Image.css";
import { useTransition, animated, useSpring } from "react-spring";

interface ImageProps {
  src: string | undefined;
}

function ImageElement({ src }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoadHandler = useCallback(() => {
    setLoaded(true);
  }, []);

  const onErrorHandler = useCallback(() => {
    setError(true);
  }, []);

  const spring = useSpring({
    to: { opacity: loaded ? 1 : 0 },
  });

  return (
    <animated.img
      className="ImageElement"
      src={error ? undefined : src}
      onLoad={onLoadHandler}
      onError={onErrorHandler}
      style={spring}
    />
  );
}

function Image({ src, ...props }: ImageProps) {
  const transitions = useTransition(src, null, {
    from: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div {...props}>
      <div className="ImageContainer">
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} className="Image" style={props}>
                <ImageElement src={item} />
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

export default Image;
