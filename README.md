# Real-Time Posts App

A full-stack MERN application that fetches posts from JSONPlaceholder, stores them in MongoDB, and provides real-time search functionality using WebSocket.

## Features

- Fetch and store posts from JSONPlaceholder API
- Real-time search with WebSocket
- Debounced search input
- Clean React UI with Vite
- MVC backend structure
- CORS support
- WebSocket reconnect logic

## Tech Stack

- **Frontend**: React (Vite), Axios, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB with Mongoose
- **WebSocket**: Socket.io

## Project Structure

```
Real-Time Posts App/
├── backend/
│   ├── controllers/
│   │   └── postsController.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── posts.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   └── PostList.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB URI and other configurations:
   ```
   MONGO_URI=mongodb://localhost:27017/real-time-posts
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your backend URLs:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /fetch-posts`: Fetch posts from JSONPlaceholder and store in MongoDB
- `GET /posts`: Get all posts
- `GET /posts/:id`: Get a single post by ID

## WebSocket Events

- `search`: Send search query from client
- `searchResults`: Receive filtered posts from server
- `error`: Receive error messages

## Deployment

### Frontend (Vercel)

1. Push your frontend code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL
   - `VITE_SOCKET_URL`: Your WebSocket server URL
4. Deploy

### Backend (Render)

1. Push your backend code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repo
4. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `PORT`: 10000 (or as per Render)
   - `FRONTEND_URL`: Your frontend URL
5. Deploy

### WebSocket Server (Render/Railway)

The WebSocket server is integrated with the backend. Deploy the backend as above.

## Live URLs

- Frontend: [Add your Vercel URL here]
- Backend: [Add your Render URL here]

## Usage

1. Start the backend server
2. Start the frontend server
3. Open the app in your browser
4. The app will automatically fetch posts on load
5. Use the search bar to filter posts in real-time

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.