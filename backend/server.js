import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import postRoutes from "./routes/post.route.js";
import { startWebSocket } from "./websocket/wsServer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


// routes
app.use("/api/posts", postRoutes);


const server = http.createServer(app);

startWebSocket({server});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("WebSocket server running on port 5001");
});

// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });