const mongoose = require("mongoose");
const Event = require("../models/Event");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fakeEvents = [
  {
    title: "Tech Conference 2025",
    description: "A gathering of industry leaders to discuss the future of technology.",
    image: "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    date: new Date("2025-05-15T10:00:00.000Z"),
    creator: "67a9e1995f2784f5658f85d8",
    attendees: ["67a9e1995f2784f5658f85d8"]
  },
  {
    title: "Startup Pitch Night",
    description: "Entrepreneurs present their innovative ideas to potential investors.",
    image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00363690-hlehvtcfhe-landscape.jpg",
    date: new Date("2025-06-10T18:30:00.000Z"),
    creator: "67a9e1995f2784f5658f85d8",
    attendees: ["67a9e1995f2784f5658f85d8"]
  },
  {
    title: "Music Festival",
    description: "A live music event featuring multiple artists and bands.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0C5QxoDe3V-9weum6Ltn9aKchfK8jaUyOZg&s",
    date: new Date("2025-08-22T14:00:00.000Z"),
    creator: "67a9e1995f2784f5658f85d8",
    attendees: ["67a9e1995f2784f5658f85d8"]
  },
  {
    title: "AI & ML Workshop by IIT Delhi",
    description: "Hands-on training on artificial intelligence and machine learning.",
    image: "https://technocon.org/images/workshops/tryst-2024-iit-delhi/workshop-main-page/tryst-2024-workshop-on-ai-and-machine-learning-at-iit-delhi-main-image.jpg",
    date: new Date("2025-09-05T09:00:00.000Z"),
    creator: "67a9e1995f2784f5658f85d8",
    attendees: ["67a9e1995f2784f5658f85d8"]
  },
  {
    title: "Photography Exhibition",
    description: "An exhibition showcasing stunning photography from around the world.",
    image: "https://cdn.sanity.io/images/cxgd3urn/production/5fa756d2e837b669fbf91fb7d3b967b111614052-2000x1149.jpg?rect=125,50,1750,1050&w=1200&h=720&q=85&fit=crop&auto=format",
    date: new Date("2025-11-12T11:00:00.000Z"),
    creator: "67a9e1995f2784f5658f85d8",
    attendees: ["67a9e1995f2784f5658f85d8"]
  }
];

Event.insertMany(fakeEvents)
  .then(() => {
    console.log("Fake events added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error inserting fake events:", err));
