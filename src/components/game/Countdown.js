import React, { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { NOTIFICATION_OFF } from "../types";

const Countdown = ({ setBegin, setStartCountdown, dispatch }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      setBegin(true);
      dispatch({ event: NOTIFICATION_OFF, payload: {} });
      setStartCountdown(false);
    }
  }, [countdown, setBegin, setStartCountdown, dispatch]);

  useInterval(() => {
    setCountdown(prevTick => prevTick - 1);
  }, 1000);

  return (
    <div className="countdown-wrapper">
      <div className="countdown">{countdown}</div>;
    </div>
  );
};

export default Countdown;
