import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import postRoutes from "./routes/post.route.js";
import { startWebSocket } from "./websocket/wsServer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// start WebSocket server
startWebSocket();

// routes
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});