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

router.route('/signout')
    .get((req, res) => {
        res.clearCookie('token').redirect('/');
    });

export default router;