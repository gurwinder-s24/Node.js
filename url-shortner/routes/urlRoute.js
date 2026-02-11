import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGetPerticularUrl } from '../controllers/urlController.js';


const router = express.Router({ mergeParams: true });
router.get('/', handleGetPerticularUrl);
router.use(methodNotAllowed());

export default router;