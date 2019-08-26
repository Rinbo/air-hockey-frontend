import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import AnimatedMessage from "./AnimatedMessage";

const StatusMessage = () => {
  const { announcement, setState } = useContext(UserContext);
  const [showMessage, updateShowMessage] = useState("");

  useEffect(() => {
    updateShowMessage(announcement.message);
  }, [announcement.message]);

  if (showMessage === "") {
    return <div style={{height: 20, margin:10}}></div>;
  }
  return (
    <AnimatedMessage
      message={announcement.message}
      code={announcement.code}
      delay={announcement.delay}
      setState={setState}
    />
  );
};

export default StatusMessage;
