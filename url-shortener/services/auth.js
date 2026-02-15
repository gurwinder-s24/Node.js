import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

function createToken(user) {
    const payload = { _id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function getUserDetailsByToken(token) {
    if (!token) return null;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}


export { createToken, getUserDetailsByToken };

// we changed userBySessionId to userDetailsByToken
// instead of userByToken, because this time we are not attaching the 
// entire user object to the token, but only the user details that
// we need to identify the user, which are _id and email.
// ( basically we are not attaching the password to the token) 