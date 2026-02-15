import { getUserDetailsByToken } from '../services/auth.js'; 

// Authentication
function checkForAuthentication(req, res, next) {
    req.user = null;
    const tokenCookie = req.cookies?.token;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    const existingUserDetails = getUserDetailsByToken(token);
    req.user = existingUserDetails;
    next();
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

export { checkForAuthentication, restrictTo };





// Alternative implementation using Authorization header instead of cookies

// function checkForAuthentication(req, res, next) {
//     req.user = null;
//     const authorizationHeaderValue = req.headers?.["authorization"];
//     if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer ')) {
//         return next();
//     }
//     const token = authorizationHeaderValue.split('Bearer ')[1];
//     const existingUserDetails = getUserDetailsByToken(token);
//     req.user = existingUserDetails;
//     next();
// }