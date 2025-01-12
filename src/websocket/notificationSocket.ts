import { Server, Socket } from "socket.io";

let io: Server;

const userSocketMap = new Map<string, string>();

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log("WebSocket server initialized.");

  io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);

    socket.on("register", (userId: string) => {
      userSocketMap.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
      console.log("Client disconnected:", socket.id);
    });
  });
}

export function sendRealTimeNotification(userId: string, notification: any) {
  console.log(userId);
  io.to(userId).emit("notification", notification);
}

export function notifyAllClients(notification: any) {
  io.emit("notification", notification);
}
