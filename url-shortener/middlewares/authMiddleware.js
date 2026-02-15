import { getUserDetailsByToken } from '../services/auth.js'; 


async function restrictToAuthenticatedUsersOnly(req, res, next) {
    try {
        // const token = req.cookies?.token;
        const token = req.headers?.["authorization"]?.split('Bearer ')[1];
        if (!token) return res.status(401).redirect('/login');

        const existingUserDetails = await getUserDetailsByToken(token);
        if (!existingUserDetails) return res.status(401).redirect('/login');
        
        req.user = existingUserDetails; // Attach user information to the request object
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkAuth(req, res, next) {
    try {
        // const token = req.cookies?.token;
        const token = req.headers?.["authorization"]?.split('Bearer ')[1];
        const existingUserDetails = await getUserDetailsByToken(token);
        req.user = existingUserDetails;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { restrictToAuthenticatedUsersOnly, checkAuth };