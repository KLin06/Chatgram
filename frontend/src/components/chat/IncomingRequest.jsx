import React from "react";
import { MessageSquare } from "lucide-react";
import { useMessageStore } from "../../store/useMessageStore";
import { useContactStore } from "../../store/useContactStore";

const IncomingRequest = ({ sender }) => {
  const { setSelectedUser } = useMessageStore();
  const { updateContact } = useContactStore();

  const handleClick = async (action) => {
    if (action === "accept") {
      await updateContact(sender._id, "accept");
    }

    if (action === "reject") {
      await updateContact(sender._id, "reject");
      setSelectedUser(null);
    }
  };

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-background">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
           justify-center animate-bounce"
            >
              <MessageSquare className="w-12 h-12 text-primary " />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold">You have a request from {sender.fullName} </h2>

        <div className="flex justify-center gap-6 !mt-8">
          <button className="btn btn-primary btn-md px-6 hover:brightness-110 transition" onClick={() => handleClick("accept")}>
            Accept
          </button>
          <button className="btn btn-outline btn-error btn-md px-6 hover:bg-error hover:text-white transition" onClick={() => handleClick("reject")}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequest;
