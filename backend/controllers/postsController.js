const axios = require('axios');
const Post = require('../models/Post');

const fetchAndStorePosts = async (req, res) => {
    try {
        // Check if posts already exist to prevent duplicates
        const existingPosts = await Post.countDocuments();
        if (existingPosts > 0) {
            return res.status(200).json({ message: 'Posts already fetched and stored' });
        }

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;

        await Post.insertMany(posts);
        res.status(200).json({ message: 'Posts fetched and stored successfully' });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch and store posts' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ id: parseInt(id) });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

module.exports = {
    fetchAndStorePosts,
    getAllPosts,
    getPostById
};