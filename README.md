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
  - Backend hosted on Render.

## Tech Stack

- **Frontend**: React.js,  Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Real Attendees**: WebSockets

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB Atlas (set up a cluster)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/event-app.git
   cd event-app/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```sh
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## Deployment

- **Frontend**: Deploy on Render by linking the GitHub repository.
- **Backend**: Deploy on Render, ensuring environment variables are set up correctly.


 
 
