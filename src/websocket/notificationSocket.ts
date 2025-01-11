import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log("WebSocket server initialized.");

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

export function sendRealTimeNotification(userId: string, notification: any) {
  io.to(userId).emit("notification", notification);
}

export function notifyAllClients(notification: any) {
  io.emit("notification", notification);
}
