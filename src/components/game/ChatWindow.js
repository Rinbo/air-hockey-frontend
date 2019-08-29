import React, { useState, useEffect } from "react";

const ChatWindow = ({ broadcast, name, newMessage }) => {
  const [state, setState] = useState([
    { subscriber: "Robin", text: "Hello all!" }
  ]);

  useEffect(() => {
    setState(prevState => [...prevState, newMessage]);
  }, [newMessage]);

  renderMessage = () => {
    return state.map(message => {
      return (
        <div>
          {message.subscriber}: {message.text}
        </div>
      );
    });
  };

  return (
    <div>
      <div>{renderMessage()}</div>
      <div>
        <input></input>
        <button className="bson-button m-n">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
