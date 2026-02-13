import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleGetAllUrls } from '../controllers/urlController.js';


const router = express.Router();
router.get('/', (req, res) => handleGetAllUrls(req, res, 'test'));
router.use(methodNotAllowed());

export default router;