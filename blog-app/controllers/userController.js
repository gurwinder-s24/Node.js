import User from '../models/userModel.js';
import { createToken } from '../services/auth.js';

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const isEmailAlreadyRegistered = await User.existsByEmail(email);
        if (isEmailAlreadyRegistered) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        await User.create({ name, email, password });
        res.status(201).redirect('/user/signin');
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUserSignin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userInfo = await User.matchCredentialsAndReturnUserInfo(email, password);
        if (!userInfo) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = createToken(userInfo);
        res.cookie('token', token).status(200).redirect('/');
        // res.json({ token }); // For API response
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { handleUserSignup, handleUserSignin };