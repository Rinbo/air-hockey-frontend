import React, { useEffect } from "react";

export const AnimatedMessage = ({ message, code, setState, delay }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        type: "FLASH_MESSAGE",
        payload: { message: "", code: 0, delay: 0 }
      });
    }, delay || 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div
      id="banner"
      style={{
        color: code === 200 ? "#21ba45" : "darkred",
        margin: 10,
        textAlign: "center",
        border: "1px solid black",
        borderRadius: 5,
        padding: 10
      }}
    >
      {message}
    </div>
  );
};

export default AnimatedMessage;
