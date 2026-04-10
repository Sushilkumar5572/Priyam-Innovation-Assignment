import axios from "axios";
import Post from "../models/Post.model.js";

// fetch and store
export const fetchPosts = async (req, res) => {
    try {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        await Post.insertMany(data, { ordered: false });

        res.json({ message: "Posts stored successfully" });
    } catch (error) {
        res.json({ message: "Posts already exist or error occurred" });
    }
};

// get all
export const getPosts = async (req, res) => {
    if (!await Post.exists()) {
        return res.status(404).json({ message: "No posts found. Please fetch posts first." });
    }
    const posts = await Post.find();
    res.json(posts);
};

// get single
export const getPostById = async (req, res) => {
    const post = await Post.findOne({ id: req.params.id });
    res.json(post);
};