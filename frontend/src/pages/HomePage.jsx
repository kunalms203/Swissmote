import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://swissmote-yq3v.onrender.com/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="events-list grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event._id} className="relative w-72 mx-auto">
            <Link to={`/events/${event._id}`} className="absolute inset-0 z-10"></Link>
            <div className="event-card bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={event.image}
                alt={event.title}
                className="event-photo w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <p className="text-gray-600 mb-2">
                  📅 Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">👤 Creator: {event.creator.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
