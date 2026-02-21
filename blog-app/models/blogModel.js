import { Schema, model } from 'mongoose';
import User from './userModel.js';

const commentSchema = new Schema({
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImageURL: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema],
}, { timestamps: true });


const Blog = model('Blog', blogSchema);
export default Blog;