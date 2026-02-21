import { getUserDetailsByToken } from '../services/auth.js'; 

// Authentication
function checkForAuthentication(cookieName = 'token') {
    return (req, res, next) => {
        req.user = null;
        const cookieValue = req.cookies?.[cookieName];
        if (!cookieValue) {
            return next();
        }
        try{
            const existingUserDetails = getUserDetailsByToken(cookieValue);
            req.user = existingUserDetails;
        }
        catch(error){
            // do nothing
        }
        return next();
    }
}

// Authorization
function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user){
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    }
}

// helper function to restrict some routes to authenticated users only
function checkIfAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/user/signin');
}

export { checkForAuthentication, restrictTo, checkIfAuthenticated };