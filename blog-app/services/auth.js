import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

function createToken(userInfo) {
    const payload = { 
        _id: userInfo._id, 
        email: userInfo.email, 
        role: userInfo.role 
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function getUserDetailsByToken(token) {
    if (!token) return null;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}


export { createToken, getUserDetailsByToken };