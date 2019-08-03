import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  const id = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  return id.current;
}
