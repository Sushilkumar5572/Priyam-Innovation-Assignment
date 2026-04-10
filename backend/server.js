import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import postRoutes from "./routes/post.route.js";
import { WebSocketServer } from "ws";
import Post from "./models/Post.model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/posts", postRoutes);

// create server
const server = http.createServer(app);

// attach websocket
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected ✅");

    ws.on("message", async (message) => {
        const query = message.toString();

        if (!query.trim()) return;

        const results = await Post.find({
            title: { $regex: query, $options: "i" },
        }).limit(10);

        ws.send(JSON.stringify(results));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server + WebSocket running on port ${PORT}`);
});