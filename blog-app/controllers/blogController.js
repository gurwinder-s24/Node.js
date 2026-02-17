import Blog from '../models/blogModel.js';

async function createBlog(req, res) {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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


export { createBlog, getAllBlogs };