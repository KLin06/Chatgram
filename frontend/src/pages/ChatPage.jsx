import React from "react";
import NoChatSelected from "../components/chat/NoChatSelected";
import ChatContainer from "../components/chat/ChatContainer";
import { useMessageStore } from "../store/useMessageStore";
import { useContactStore } from "../store/useContactStore";
import OutgoingRequest from "../components/chat/OutgoingRequest";
import IncomingRequest from "../components/chat/IncomingRequest";
import ContactPanel from "../components/chat/ContactPanel";

const ChatPage = () => {
  const { selectedUser } = useMessageStore();
  const {contacts} = useContactStore();

  const renderContent = () => {
    if(!selectedUser)
      return <NoChatSelected />

    if(contacts && selectedUser){
      const request = contacts.filter((contact) => (contact.user._id === selectedUser._id))[0]

      if (!request) return <NoChatSelected />; //fixxxx
  
      const {user, status, direction} = request;
  
      if (status === "pending" && direction === "sent"){
        return <OutgoingRequest receiver = {user}/>
      }
      if (status === "pending" && direction === "received"){
        return <IncomingRequest sender = {user}/>
      }
  
      // to do
      if (status === "blocked" && direction === "sent"){
        
      }
      if (status === "blocked" && direction === "received"){
        
      }
    }

    return <ChatContainer/>
  }


  return (
    <div className=" bg-background">
      <div className="flex items-center justify-center px-0 ">
        <div className="h-[calc(100vh-4.5rem)] bg-base-100 w-full max-w-[1600px] mx-1">
          <div className="flex h-full rounded-lg overflow-hidden">
            <ContactPanel/>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
