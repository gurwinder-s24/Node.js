import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import { createToken } from '../services/auth.js';
import { response } from 'express';

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        // await User.create({ name, email, password });
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).redirect('/login');
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser || existingUser.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const token = createToken(existingUser);
        // res.cookie('token', token);
        res.json({ token }); // Send the token in the response body
        res.status(200).redirect('/'); // Redirect to home page after successful login
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { handleUserSignup, handleUserLogin };