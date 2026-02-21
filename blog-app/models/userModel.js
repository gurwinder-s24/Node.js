import { Schema, model } from 'mongoose';
import argon2 from 'argon2';
import { hashPassword, verifyPassword } from '../middlewares/userMiddlewares/argon2.js';
import { existsByEmail, matchCredentialsAndReturnUserInfo } from '../middlewares/userMiddlewares/validation.js';

const userSchema = new Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    profileImageURL: { type: String, default: '/images/default.png' },
    role: { 
        type: String, 
        // required: true, 
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
  
}, { timestamps: true });

userSchema.pre('save', hashPassword);
userSchema.methods.comparePassword = verifyPassword;

userSchema.static('existsByEmail', existsByEmail);
userSchema.static('matchCredentialsAndReturnUserInfo', matchCredentialsAndReturnUserInfo);
userSchema.static('findUserInfoById', async function(id) {
    const userInfo = await this.findById(id).select('-password');
    return userInfo;
});

const userModel = model('User', userSchema);
export default userModel;