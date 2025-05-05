import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useSessionStore } from "./useSessionStore";

export const useMessageStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser:null,
    isUserLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (selectedUser) => set({selectedUser}),

    getUsers: async() => {
        set({isUserLoading: true} );
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUserLoading: false} );
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading: true} );
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading: false} );
        }
    },

    sendMessage: async(messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages:[...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get()

        if(!selectedUser) return;

        const socket = useSessionStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;
            set({
                messages: [...get().messages, newMessage]
            })
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useSessionStore.getState().socket;

        socket.off("newMessage");
    },
}));