import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server (server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
};


io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // broadcast to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        console.log("A user disconnected", socket.id);
    })
})

export {io, app, server};