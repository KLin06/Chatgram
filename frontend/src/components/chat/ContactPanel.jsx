import { useEffect, useState } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import { useSessionStore } from "../../store/useSessionStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useContactStore } from "../../store/useContactStore";
import { SearchBar } from "./SearchBar";

const ContactPanel = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const { getContacts, contacts, isContactsLoading, onlineContacts, setOnlineContacts } = useContactStore();

  const { onlineUsers } = useSessionStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getContacts();
  }, [getContacts]);
  
  useEffect(() => {
    setOnlineContacts(contacts.filter((contact) => onlineUsers.includes(contact.user._id)).map((contact) => contact.user._id));
  }, [contacts, setOnlineContacts, onlineUsers]);

  const filteredUsers = showOnlineOnly ? contacts.filter((contact) => onlineContacts.includes(contact.user._id)) : contacts;

  if (isContactsLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-300 flex flex-col transition-all duration-200 bg-surface">
      <div className="border-b border-r border-slate-950 w-full p-5 bg-surface">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="w-full h-10 my-4">
          <SearchBar />
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)} className="checkbox checkbox-sm" />
            <span className="text-sm">Show online</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineContacts.length} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user.user._id}
            onClick={() => setSelectedUser(user.user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 hover:brightness-90 transition-colors pl-5
              ${selectedUser?._id === user.user._id ? "bg-base-300 ring-1 ring-base-300 brightness-90" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img src={user.user.profilePic || "/avatar.png"} alt={user.user.name} className="size-12 object-cover rounded-full" />
              {onlineUsers.includes(user.user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.user.fullName}</div>
              <div className="text-sm text-zinc-400">{onlineUsers.includes(user.user._id) ? "Online" : "Offline"}</div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No online users</div>}
      </div>
    </aside>
  );
};
export default ContactPanel;
