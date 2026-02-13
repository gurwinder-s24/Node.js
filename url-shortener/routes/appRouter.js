import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGetAllUrls, handleGetPerticularUrl } from '../controllers/urlController.js';


const router = express.Router();
router.get('/', (req, res) => handleGetAllUrls(req, res, 'home'));
router.get('/:shortId', handleGetPerticularUrl);
router.use(methodNotAllowed());

export default router;