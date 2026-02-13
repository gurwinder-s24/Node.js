import { getUserBySessionId } from '../services/auth.js'; 


async function restrictToAuthenticatedUsersOnly(req, res, next) {
    try {
        const sessionId = req.cookies?.sessionId;
        if (!sessionId) return res.status(401).redirect('/login');

        const existingUser = await getUserBySessionId(sessionId);
        if (!existingUser) return res.status(401).redirect('/login');
        
        req.user = existingUser; // Attach user information to the request object
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkAuth(req, res, next) {
    try {
        const sessionId = req.cookies?.sessionId;
        const existingUser = await getUserBySessionId(sessionId);
        req.user = existingUser;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { restrictToAuthenticatedUsersOnly, checkAuth };