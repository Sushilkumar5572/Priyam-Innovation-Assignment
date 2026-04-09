require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const postsRoutes = require('./routes/posts');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', postsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// WebSocket connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('search', async (query) => {
        try {
            const Post = require('./models/Post');
            let posts;
            if (query.trim() === '') {
                posts = await Post.find();
            } else {
                posts = await Post.find({
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { body: { $regex: query, $options: 'i' } }
                    ]
                });
            }
            socket.emit('searchResults', posts);
        } catch (error) {
            console.error('Error searching posts:', error);
            socket.emit('error', 'Failed to search posts');
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});