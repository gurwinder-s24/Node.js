

const existsByEmail = async function(email) {
    const existingUser = await this.findOne({ email });
    return Boolean(existingUser);
}

const matchCredentialsAndReturnUserInfo = async function(email, password) {
    const existingUser = await this.findOne({ email });
    if (!existingUser) {
        return null;
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
        return null;
    }
    const userInfo = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
    };
    return userInfo;
}

export { existsByEmail, matchCredentialsAndReturnUserInfo };