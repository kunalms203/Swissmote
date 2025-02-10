require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // Import HTTP for Socket.IO
const { Server } = require("socket.io"); // Import Socket.IO
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const Event = require("./models/Event"); // Import Event Model
const mongoose = require("mongoose");


connectDB();
const app = express();
const server = http.createServer(app); // Create HTTP Server for Socket.IO

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
      credentials: true, 
    },
  });
  
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://swissmote-1-dv8r.onrender.com"], // Add Render frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Socket.IO for real-time attendance
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("joinEvent", async ({ eventId, userId }) => {
      try {
        console.log(`Received eventId: ${eventId}, userId: ${userId}`);
  
        // ✅ Ensure IDs are valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
          console.log(`Received eventId: ${eventId}, userId: ${userId}`);
          console.log("Invalid eventId or userId format");
          return socket.emit("error", { message: "Invalid event ID or user ID" });
        }
  
        const event = await Event.findById(eventId);
        if (!event) {
          console.log("Event not found in DB");
          return socket.emit("error", { message: "Event not found" });
        }
  
        // ✅ Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
  
        // ✅ Check if user is already in attendees
        if (event.attendees.includes(userObjectId)) {
          console.log("User already attending");
          return socket.emit("error", { message: "User already attending" });
        }
  
        // ✅ Push and Save
        event.attendees.push(userObjectId);
        await event.save();
        console.log(`User ${userId} added to event ${eventId}`);
  
        io.emit("attendeeUpdated", { eventId, attendees: event.attendees.length });
  
      } catch (error) {
        console.error("Error updating attendees:", error);
        socket.emit("error", { message: "Server error" });
      }
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
  
  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
