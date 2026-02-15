import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { restrictTo } from '../middlewares/authMiddleware.js';
import { handleGetAllUrls, handleGetPerticularUrl } from '../controllers/urlController.js';


const router = express.Router();
// static routes for rendering ejs views
router.get('/admin/urls', restrictTo(["ADMIN"]), (req, res) => handleGetAllUrls(req, res, 'home', true));
router.get('/', restrictTo(["NORMAL", "ADMIN"]), (req, res) => handleGetAllUrls(req, res, 'home'));
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));
// dynamic route for redirecting short url to long url
router.get('/:shortId', handleGetPerticularUrl);
router.use(methodNotAllowed());

export default router;