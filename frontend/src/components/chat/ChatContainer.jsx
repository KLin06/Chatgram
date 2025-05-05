import React, { useEffect, useRef } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useSessionStore } from "../../store/useSessionStore";
import { formatMessageTime } from "../../lib/utils";
import { LoaderCircle } from "lucide-react";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { sessionUser } = useSessionStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col  overflow-auto">
        <ChatHeader />
        <div className="flex h-full w-full bg-background justify-center items-center">
          <LoaderCircle className="w-16 h-16 animate-spin" />
        </div>
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="bg-background flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          return (
          
          <div key={message._id} className={`chat ${message.senderId === sessionUser._id ? "chat-end" : "chat-start"}`}  ref={isLast ? messageEndRef : null}>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={message.senderId === sessionUser._id ? sessionUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className={`chat-bubble flex flex-col ${message.senderId === sessionUser._id ? "bg-primary" : "bg-muted"}`}>
              {message.image && <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        )})}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
