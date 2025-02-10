# Event Management Platform

## Overview 

The Event Management Platform is a full-stack web application built using the MERN stack. It allows users to create, manage, and attend events with real-time updates.

## Features

 - **User Authentication**: Secure authentication using JWT.
 - **Event Creation & Management**: Users can create, edit, and delete events.
 - **Real-time Updates**: WebSockets enable real-time event attendance.
 - **Database**: MongoDB Atlas is used for data storage.
 - **Deployment**:
  - Frontend hosted on Render
  - Backend hosted on Render

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
 - **Backend**: Node.js, Express.js
 - **Database**: MongoDB Atlas
 - **Authentication**: JWT
 - **Real-time Attendees**: WebSockets

## Installation & Setup

### Preqruisites

ensure you have the following installed:

 - Node.js
 - MongoDB Atlas (set up a cluster)

### Backend Setup

1. Clone the repository:
   pyled
   git clone https://github.com/kunalms203/Swissmote.git
   cd event-app/backend
 - Install dependencies:
   code 
   npm install
  - Create a '.env' file and add the following:
   code 
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
  - Start the backend server:
   codes
   npm run dev

### Frontend Setup

1. Navigate to the frontend directory:
   code
   cd `../frontend`
  - Install dependencies: 
   code 
   npm install
  - Start the frontend server:
   code
   npm start

### Deployment

- **Frontend**: Deploy on Render by linking the GitHub repository.
- **Backend**: Deploy on Render, ensuring environment variables are set up correctly.
- **Live Demo**: https://swissmote-1-dv8r.onrender.com
