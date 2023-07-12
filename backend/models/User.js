import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    fname: { 
        type: String,
        required: true,
    },
    lname: { 
        type: String,
    },
    username: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    age: String,

    cnum: String,

    password: {
        type: String,
        required: true,
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    saved_posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }]
});

UserSchema.methods.checkPassword = function (password) {
    console.log("here");
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
    const payload = {
        user: {
            id: this._id
        },
    };

    const secret = process.env.SECRET_KEY;

    const token = jwt.sign(payload, secret, {expiresIn: 3600000000});

    return token;
}

const User = mongoose.model('user', UserSchema);

export default User;