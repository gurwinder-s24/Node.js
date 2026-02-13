import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { handleUserSignup, handleUserLogin } from '../controllers/userController.js';


const router = express.Router();
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
router.use(methodNotAllowed());

export default router;