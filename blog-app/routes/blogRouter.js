import express from 'express';
import { upload, storage } from '../middlewares/blogMiddlewares/multer.js';
import { createBlog } from '../controllers/blogController.js';
const router = express.Router();


router.route('/new')
    .get((req, res) => {
        res.render('addBlog', { user: req.user });
    });


router.route('/')
    .post( upload.single('coverImage'), createBlog );


export default router;