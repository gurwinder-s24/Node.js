
const sessionIdToUserMap = new Map();

function createSession(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUserBySessionId(id) {
    return sessionIdToUserMap.get(id);
}

export { createSession, getUserBySessionId };