import React from "react";
import ChatTitle from "./ChatTitle";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const index = () => {
  return (
    <div className="chat__wrapper">
      <ChatTitle />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default index;
