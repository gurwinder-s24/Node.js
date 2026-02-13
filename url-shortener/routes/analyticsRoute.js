import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGetAnalytics } from '../controllers/urlController.js';


const router = express.Router();
router.get('/:shortId', handleGetAnalytics);
router.use(methodNotAllowed());

export default router;