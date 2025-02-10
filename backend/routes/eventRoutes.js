const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("Auth Middleware Type:", typeof authMiddleware); // Should print "function"

console.log("Router:", router); 
// Create Event
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, image ,date } = req.body;
  const event = new Event({ title, description, image, date, creator: req.user.id });
  await event.save();
  res.status(201).json(event);
});

// Get Events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("creator", "name").sort({ date: 1 });
  res.json(events);
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const mongoose = require("mongoose");

// Add Attendee to Event
router.post("/:id/attend", authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id; // ✅ Ensure this is ObjectId

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ Convert userId to ObjectId and check if already added
    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (event.attendees.includes(userObjectId)) {
      return res.status(400).json({ message: "User already attending" });
    }

    event.attendees.push(userObjectId);
    await event.save();

    res.json({ message: "Attendee added successfully", event });
  } catch (error) {
    console.error("Error updating attendees:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
