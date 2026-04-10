import { WebSocketServer } from "ws";
import Post from "../models/Post.model.js";

export const startWebSocket = (port = 5001) => {
    const wss = new WebSocketServer({ port });

    console.log(`WebSocket running on ${port}`);

    wss.on("connection", (ws) => {
        ws.on("message", async (message) => {
            const query = message.toString();

            if (!query) return;

            const results = await Post.find({
                title: { $regex: query, $options: "i" },
            });

            ws.send(JSON.stringify(results));
        });
    });
};