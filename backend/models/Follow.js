import mongoose from "mongoose";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const FollowSchema = new mongoose.Schema({

    username: {
        type: String, 
        required: true,
    },
   
});

const Follow = mongoose.model('user', UserSchema);

export default User;