import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSessionStore } from "../../store/useSessionStore";
import { useMessageStore } from "../../store/useMessageStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();

  return (
    <div className="p-2.5 border-b border-base-300 bg-surface">
      <div className="flex items-center justify-between">
        <Link to={`../posts/${selectedUser._id}`}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              </div>
            </div>

            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm text-base-content/70">{selectedUser.email}</p>
            </div>
          </div>
        </Link>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
