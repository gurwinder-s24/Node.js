import Blog from '../models/blogModel.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: 'failed',
        message: message
    });
};


async function createBlog(req, res) {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return sendError(res, 400, 'Title and content are required');
        }

        const blog = await Blog.create({
            title,
            content,
            coverImageURL: req.file ? `/uploads/${req.user._id}/${req.file.filename}` : '/images/default.png',
            createdBy: req.user._id
        });

        res.status(201).redirect(`/blog/${blog._id}`);
    }
    catch (error) {
        sendError(res, 500, 'Internal Server Error');
    }
}

async function getAllBlogs() {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return blogs;
    }
    catch (error) {
        return [];
    }
}

async function getBlogById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendError(res, 400, 'Invalid blog ID')
        }
        // const blog = await Blog.findById(req.params.id);
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return sendError(res, 404, 'Blog with this ID does not exist');
        }

        const blogObject = blog.toObject();
        // populate blog author info
        blogObject.createdBy = await User.findUserInfoById(blog.createdBy);
        // populate comment authors info
        blogObject.comments = await Promise.all(
            blog.comments.map(async (comment) => {
                const commentObject = comment.toObject();
                commentObject.createdBy = await User.findUserInfoById(comment.createdBy);
                return commentObject;
            })
        );

        res.status(200).render('blog', { blog: blogObject, user: req.user });
    }
    catch (error) {
        sendError(res, 500, 'Internal Server Error');
    }
}

async function postCommentOnBlog(req, res) {
    try {
        const { content } = req.body;
        if (!content) {
            return sendError(res, 400, 'Comment should not be empty');
        }

        const blogId = req.params.blogId;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return sendError(res, 400, 'Invalid blog ID');
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return sendError(res, 404, 'Blog with this ID does not exist');
        }
        
        blog.comments.push({
            content,
            createdBy: req.user._id
        });
        await blog.save();
        res.status(201).redirect(`/blog/${blog._id}`);
    }
    catch (error) {
        sendError(res, 500, 'Internal Server Error');
    }
}

export { createBlog, getAllBlogs, getBlogById, postCommentOnBlog };