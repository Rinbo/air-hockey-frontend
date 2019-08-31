import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { UPDATE_CHAT_HISTORY } from "../types";

const ChatWindow = ({ broadcast, name, incomingMessage, dispatch }) => {
  const { chatHistory, setState } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (Object.values(incomingMessage).length !== 0) {
      const newChatHistory = chatHistory;
      newChatHistory.push(incomingMessage);
      setState({ type: UPDATE_CHAT_HISTORY, payload: newChatHistory });
      dispatch({ type: "incoming_chat_message", payload: {} });
    }
    // eslint-disable-next-line
  }, [incomingMessage]);

  const onSubmit = () => {
    broadcast("chat_message_out", { name, newMessage });
    setNewMessage("");
  };

  const renderMessage = () => {
    return chatHistory.map(message => {
     /*  var time = new Date().getTime();
      var date = new Date(time);
      alert(date.toString()); */
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
