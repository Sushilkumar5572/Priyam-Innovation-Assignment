import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: Number,
    id: { type: Number, unique: true },
    title: String,
    body: String,
});

export default mongoose.model('Post', postSchema);