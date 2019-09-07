import React, { useState, useEffect } from "react";

const ChatWindow = ({ broadcast, name, chatHistory }) => {
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messageBody = document.querySelector(".chat-wrapper");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [chatHistory]);

  const handleOnKeyDown = e => {
    if (e.key === "Enter") onSubmit();
  };

  const onSubmit = () => {
    broadcast("chat_message_out", { name, newMessage });
    setNewMessage("");
  };

  const renderMessage = () => {
    return chatHistory.map(message => {
      return (
        <div key={message.timestamp} className="chat-flex">
          <div style={{}}>
            {message.name} ({parseTime(message.timestamp)}):
          </div>
          <div style={{}}>{message.incoming_message}</div>
        </div>
      );
    });
  };

  const parseTime = milliseconds => {
    const date = new Date(parseInt(milliseconds));
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour}:${minutes}`;
  };

  return (
    <>
    Game Chat
    <div className="chat-window">
      <div className="chat-wrapper">{renderMessage()}</div>
      <div className="chat-input">
        <input
          value={newMessage}
          placeholder="Write something..."
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => handleOnKeyDown(e)}
        />
        <button className="bson-button m-n" onClick={onSubmit}>
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatWindow;
