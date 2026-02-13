// appRouter.js basically a static router for rendering ejs views.
import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGetAllUrls, handleGetPerticularUrl } from '../controllers/urlController.js';


const router = express.Router();
router.get('/', (req, res) => handleGetAllUrls(req, res, 'home'));
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));
router.get('/:shortId', handleGetPerticularUrl);
router.use(methodNotAllowed());

export default router;