import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGenerateShortUrl } from '../controllers/urlController.js';


const router = express.Router();
router.post('/', handleGenerateShortUrl);
router.use(methodNotAllowed());

export default router;