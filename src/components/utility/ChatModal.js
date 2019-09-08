import React from "react";
import ReactDOM from "react-dom";
import ChatWindow from "../game/ChatWindow";

const ChatModal = ({ broadcast, name, chatHistory, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="modal">
      <div onClick={e => e.stopPropagation()} className="modal-content">
        <span onClick={onDismiss} className="close">
          &times;
        </span>
          <ChatWindow
            broadcast={broadcast}
            name={name}
            chatHistory={chatHistory}
          />
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ChatModal;
