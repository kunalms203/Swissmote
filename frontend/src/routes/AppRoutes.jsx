import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateEventPage from "../pages/CreateEventPage";
import EventDetail from "../pages/EventDetails";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
  );
};

export default AppRoutes;
