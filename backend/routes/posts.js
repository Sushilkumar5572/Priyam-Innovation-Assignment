const express = require('express');
const router = express.Router();
const { fetchAndStorePosts, getAllPosts, getPostById } = require('../controllers/postsController');

router.get('/fetch-posts', fetchAndStorePosts);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);

module.exports = router;