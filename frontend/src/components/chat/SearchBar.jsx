import React, { useEffect, useState } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import { useContactStore } from "../../store/useContactStore";
import { useSessionStore } from "../../store/useSessionStore";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { users, getUsers } = useMessageStore();
  const { contacts, addContact } = useContactStore();
  const { sessionUser } = useSessionStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const contactUsersId = contacts.map((contact) => contact.user._id);

  const suggestions = users.filter(
    (user) => user.fullName.toLowerCase().includes(query.toLowerCase()) && user._id !== sessionUser._id && !contactUsersId.includes(user._id)
  );

  const handleSelect = async (user) => {
    await addContact(user._id);
    setQuery("");
  };

  return (
    <div className="relative w-full h-full">
      <input
        type="text"
        className="w-full h-full input input-bordered rounded-lg input-sm sm:input-md"
        placeholder="Add Contact..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="absolute bg-base-100 shadow rounded mt-1 w-full z-10 max-h-60 overflow-y-auto">
          {suggestions.map((user) => (
            <li key={user._id} className="p-2 hover:bg-base-200 cursor-pointer" onClick={() => handleSelect(user)}>
              {user.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
