import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useSessionStore } from "./useSessionStore";

export const useContactStore = create((set, get) => ({
  contacts: [],
  onlineContacts: [],
  isContactLoading: false,

  getContacts: async () => {
    set({ isContactLoading: true });

    const { sessionUser } = useSessionStore.getState();

    try {
      const res = await axiosInstance.get("/contacts/contacts");

      if (!res || !res.data) return;

      const cleaned = res.data.map((contact) => {
        const sender = contact.senderId;
        const receiver = contact.receiverId;
        const isSender = sender._id.toString() === sessionUser._id;

        return {
          user: isSender ? receiver : sender, // the other user
          status: contact.status,
          direction: isSender ? "sent" : "received", // direction of request
        };
      });

      set({ contacts: cleaned });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isContactLoading: false });
    }
  },

  addContact: async (userId) => {
    const { getContacts } = get();
    // add the contact of the userId
    try {
      await axiosInstance.post(`/contacts/request/${userId}`);
      getContacts();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  updateContact: async (userId, action) => {
    // userId represents the other user
    const { contacts } = get();
    try {
      await axiosInstance.put(`/contacts/${action}/${userId}`);

      if (action === "accept") {
        let request = contacts.find((contact) => contact.user._id === userId);

        if (!request) return;

        set({
          contacts: contacts.map((c) => (c.user._id === userId ? { ...c, status: action } : c)),
        });
      }

      if (action === "reject"){
        set({
          contacts: contacts.filter((c) => c.user._id !== userId),
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  setOnlineContacts: (contactList) => {
    set({onlineContacts: contactList});
  }
}));
