import React, { useState } from "react";

const ChatWindow = ({ broadcast, name, chatHistory }) => {
  const [newMessage, setNewMessage] = useState("");

  const onSubmit = () => {
    broadcast("chat_message_out", { name, newMessage });
    setNewMessage("");
  };

  const renderMessage = () => {
    return chatHistory.map(message => {
      return (
        <div key={message.timestamp} className="chat-flex">
          <div style={{ width: "35%" }}>
            {message.name} ({parseTime(message.timestamp)}):
          </div>
          <div style={{ width: "65%" }}>{message.incoming_message}</div>
        </div>
      );
    });
  };

  const parseTime = seconds => {
    const date = new Date(parseInt(seconds) * 1000);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour}:${minutes}`;
  };

  return (
    <div className="chat-window">
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
