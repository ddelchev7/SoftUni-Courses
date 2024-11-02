import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const authService = {
  async register(username, email, password, rePassword) {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (password !== rePassword) {
      throw new Error("Password missmatch !");
    }

    if (user) {
      throw new Error("User already exists !");
    }
    const newUser = await User.create({
      username,
      email,
      password,
    });
    return this.generateToken(newUser)
  },
  async login(username,password){
    const user = await User.findOne({ username })

    if(!user){
        throw new Error('Invalid user or password')
    }

    const isValid = await bcrypt.compare(password, user.password)
    
    if(!isValid){
        throw new Error("Invalid user or password")
    }

    return this.generateToken(user);
  },
  async generateToken(user){
    const payload = {
        _id: user._id,
        username: user.username
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'})

    return token;
  }
};

export default authService;
