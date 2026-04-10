# Real-Time Posts App

This project is a full-stack app that:

- fetches posts from `JSONPlaceholder`
- stores them in MongoDB
- serves them through an Express API
- displays them in a React frontend
- supports live search through WebSocket

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Real-time search: WebSocket

## Project Structure

```text
Real-Time Posts App/
├── backend/
│   ├── config/         # database configuration and connection setup
│   ├── controllers/    # request handling and business logic
│   ├── models/         # Mongoose data models
│   ├── routes/         # API route definitions
│   ├── websocket/      # WebSocket server logic for real-time search
│   ├── .env.example    # sample environment variables
│   ├── .env            # your local environment variables (create this manually)
│   ├── package.json
│   └── server.js       # backend entry point
├── frontend/
│   ├── public/         # static public assets
│   ├── src/
│   │   ├── components/ # reusable UI components
│   │   ├── App.css     # main app styling
│   │   ├── App.js      # root React component
│   │   └── index.js    # frontend entry point
│   └── package.json
└── README.md
```

This structure follows a clean, modular, and scalable design pattern:

- `backend/config`, `controllers`, `models`, and `routes` keep responsibilities separated.
- `websocket` is isolated from the REST API layer, which keeps real-time logic easy to maintain.
- `frontend/src/components` holds reusable UI pieces, making the interface easier to extend.
- Each layer has a clear purpose, so new features can be added without mixing database, API, and UI logic together.

## Prerequisites

Make sure these are installed on your system:

- Node.js 18 or later
- npm
- MongoDB Atlas connection string or local MongoDB instance

To verify:

```bash
node -v
npm -v
```

## Step-by-Step Setup

### 1. Open the project

```bash
cd "Real-Time Posts App"
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

The backend uses a local `.env` file inside the `backend` folder.

Use `backend/.env.example` as a reference, then create your own `backend/.env` file.

Example:

```bash
cd backend
cp .env.example .env
```

After that, update `backend/.env` with your own values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Notes:

- `.env.example` is only a template file.
- Each developer should create their own `.env` file locally.
- `MONGO_URI` should point to your MongoDB database.
- `PORT=5000` is the API server port used by the frontend.
- `FRONTEND_URL` is not currently enforced in code, but keeping it aligned with the frontend is a good idea.

### 4. Start the backend server

From the `backend` folder, run:

```bash
npm run dev
```

Or for normal start:

```bash
npm start
```

When the backend starts successfully, you should see logs similar to:

```text
MongoDB connected
WebSocket running on 5001
Server running on port 5000
```

### 5. Install frontend dependencies

Open a new terminal and run:

```bash
cd "Real-Time Posts App/frontend"
npm install
```

### 6. Start the frontend

From the `frontend` folder, run:

```bash
npm start
```

This should open the app in your browser at:

```text
http://localhost:3000
```

## How the App Works

1. The frontend first requests posts from `http://localhost:5000/api/posts`.
2. If no posts exist yet, the frontend triggers `http://localhost:5000/api/posts/fetch-posts`.
3. The backend fetches posts from `https://jsonplaceholder.typicode.com/posts`.
4. Those posts are stored in MongoDB.
5. The frontend reloads the posts and displays them.
6. Search input sends text to the WebSocket server at `ws://localhost:5001`.
7. Matching posts are returned in real time.

## API Endpoints

### Get all posts

```http
GET /api/posts
```

### Fetch and store posts from external API

```http
GET /api/posts/fetch-posts
```

### Get a single post by id

```http
GET /api/posts/:id
```

## Run Order

Always start the app in this order:

1. Start the backend
2. Start the frontend
3. Open `http://localhost:3000`

## Quick Test Checklist

After starting both servers:

1. Open the frontend in the browser.
2. Confirm posts are visible.
3. Type in the search box.
4. Confirm the list updates based on the search text.

## Common Issues

### MongoDB connection failed

Check:

- your `MONGO_URI` is valid
- your IP is allowed in MongoDB Atlas
- the database user and password are correct

### Frontend shows no data

Check:

- backend is running on `http://localhost:5000`
- MongoDB is connected
- the backend can reach `jsonplaceholder.typicode.com`

### WebSocket search not working

Check:

- backend started successfully
- port `5001` is free
- the browser console does not show WebSocket connection errors

## Available Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm start
npm test
npm run build
```

## Default Local Ports

- Frontend: `3000`
- Backend API: `5000`
- WebSocket: `5001`

## Future Improvements

- move API and WebSocket URLs into frontend environment variables
- use `FRONTEND_URL` in backend CORS configuration
- add seed protection to avoid duplicate inserts
- add error states and loading states in the UI
