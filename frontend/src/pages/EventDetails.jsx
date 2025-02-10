import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";

const EventDetails = () => {
  const { id } = useParams();
  const socket = useSocket();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
      console.log("userId:", decodedToken.id);
    }
  }, []);

  useEffect(() => {
    fetch(`https://swissmote-yq3v.onrender.com/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setAttendees(data.attendees.length);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  useEffect(() => {
    if (socket && event) {
      socket.emit("joinEvent", { eventId: event._id, userId });

      socket.on("updateAttendees", ({ eventId, attendees }) => {
        if (eventId === event._id) {
          setAttendees(attendees);
        }
      });

      return () => {
        socket.emit("leaveEvent", { eventId: event._id, userId });
      };
    }
  }, [socket, event]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-100 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
      <p className="text-gray-700 font-medium mt-2">{event.description}</p>
      <p className="text-gray-600font-medium mt-2">📅 {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 font-medium mt-2">👥 Attendees: {attendees}</p>
    </div>
  );
};

export default EventDetails;


