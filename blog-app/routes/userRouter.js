import express from 'express';
import { handleUserSignup, handleUserSignin } from '../controllers/userController.js';
const router = express.Router();


router.route('/signup')
    .get((req, res) => {
        res.render('signup');
    })
    .post( handleUserSignup );

router.route('/signin')
    .get((req, res) => {
        res.render('signin');
    })
    .post( handleUserSignin );



export default router;