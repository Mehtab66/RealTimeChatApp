// socket.js
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

function initializeSocketIO(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"], // Adjust for your frontend URL
      methods: ["GET", "POST"],
    },
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      console.log("No token provided");

      return next(new Error("No token provided"));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.adminId) {
        socket.adminId = decoded.adminId; // Admin identifier
        socket.isAdmin = true;
      } else if (decoded.userId) {
        socket.userId = decoded.userId; // User (member) identifier
        socket.isAdmin = false;
      } else {
        return next(new Error("Invalid token payload"));
      }
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  // Connection handling
  io.on("connection", (socket) => {
    console.log(
      `Client connected: ${socket.adminId || socket.userId} (${
        socket.isAdmin ? "admin" : "member"
      })`
    );

    // Join user-specific room
    const clientId = socket.adminId || socket.userId;
    socket.join(clientId);

    // Admins join 'admins' room
    if (socket.isAdmin) {
      socket.join("admins");
      console.log(`${socket.adminId} joined admins room`);
    }

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.adminId || socket.userId}`);
    });
  });

  return io;
}

module.exports = { initializeSocketIO };
