import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

function createToken(user) {
    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function getUserByToken(token) {
    if (!token) return null;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}


export { createToken, getUserByToken };