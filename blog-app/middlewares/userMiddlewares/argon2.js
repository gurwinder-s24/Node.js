import argon2 from 'argon2';

// we are not using arrow function because we need to
// access this keyword which is the user document
const hashPassword = async function() {
    if (!this.isModified('password')) {
        return;
    }

    try {
        const hash = await argon2.hash(this.password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16, // 64 MB
                timeCost: 3, // 3 iterations
                parallelism: 1, // single thread
        });
        this.password = hash;
    }
    catch(error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

const verifyPassword = async function(candidatePassword) {
    try {
        return await argon2.verify(this.password, candidatePassword);
    } catch (err) {
        // console.error("Password verification error:", err);
        // just used this log for internal debugging, 
        // but in production, we should not log such errors 
        // to avoid leaking sensitive information
        return false;
    }
}

export { hashPassword, verifyPassword };