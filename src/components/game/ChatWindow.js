import React, { useState, useEffect } from "react";

const ChatWindow = ({ broadcast, name, incomingMessage, dispatch }) => {
  const [state, setState] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (Object.values(incomingMessage).length !== 0) {
      setState(prevState => {
        const oldArray = prevState;
        oldArray.push(incomingMessage);
        return oldArray;
      });
      dispatch({ type: "incoming_chat_message", payload: {} });
    }
  }, [incomingMessage, dispatch]);

  const onSubmit = () => {
    broadcast("chat_message_out", { name, newMessage });
    setNewMessage("");
  };

  const renderMessage = () => {
    return state.map(message => {
      console.log(typeof parseInt(message.timeStamp));
      return (
        <div key={message.timeStamp}>
          {message.name} ({message.timeStamp}): {message.text}
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
