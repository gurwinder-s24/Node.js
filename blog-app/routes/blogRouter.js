import express from 'express';
import { upload, storage } from '../middlewares/blogMiddlewares/multer.js';
import { createBlog, postCommentOnBlog } from '../controllers/blogController.js';
const router = express.Router();
import { getBlogById } from '../controllers/blogController.js';
import { checkIfAuthenticated } from '../middlewares/authMiddleware.js';

router.route('/new')
    .get(checkIfAuthenticated, (req, res) => {
        res.render('addBlog', { user: req.user });
    });

router.route('/')
    .post(checkIfAuthenticated, upload.single('coverImage'), createBlog );

router.route('/:id')
    .get( getBlogById );

router.route('/comment/:blogId')
    .post(checkIfAuthenticated, postCommentOnBlog );


export default router;