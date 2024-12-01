import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";

const SALT_ROUNDS = 10;


const userSchema = new Schema ({
    email: String,
    password: {
        type: String,
        minLength: [3, "Your password is too short"]
    }
})

userSchema.pre('save', async function() {
    // Hash password before save
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;

})

const User = model('User', userSchema);

export default User;