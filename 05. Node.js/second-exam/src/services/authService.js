import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';

import User from "../models/User.js";
import { JWT_SECRET } from '../constants.js';

const register = async (name, email, password, rePassword) => {
    const userCount = await User.countDocuments({ email });

    if (userCount > 0) {
        throw new Error('User already exists');
    }

    return User.create({ name, email, password, rePassword });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User does not exist!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match');
    }

    const payload = {
        _id: user._id,
        email,
    };

    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
}

export default {
    register,
    login,
}