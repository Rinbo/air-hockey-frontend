import React, { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";

const Countdown = ({ setBegin, setStartCountdown }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      setBegin(true);
      setStartCountdown(false);
    }
  }, [countdown, setBegin, setStartCountdown]);

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
