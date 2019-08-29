import React, { useState, useEffect } from "react";

const ChatWindow = ({ broadcast, name, incomingMessage }) => {
  const [state, setState] = useState([
    { subscriber: "Robin", text: "Hello all!" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (Object.values(incomingMessage).length !== 0)
      setState(prevState => [...prevState, incomingMessage]);
  }, [incomingMessage]);

  const onSubmit = () => {
    broadcast("chat_message_out", { name, newMessage });
    setNewMessage("");
  };

  const renderMessage = () => {
    return state.map(message => {
      return (
        <div key={state.length}>
          {message.subscriber}: {message.text}
        </div>
      );
    });
  };

  return (
    <div>
      <div>{renderMessage()}</div>
      <div>
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button className="bson-button m-n" onClick={onSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
