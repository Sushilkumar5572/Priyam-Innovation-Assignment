import express from "express";
import {
    fetchPosts,
    getPosts,
    getPostById,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/fetch-posts", fetchPosts);
router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;