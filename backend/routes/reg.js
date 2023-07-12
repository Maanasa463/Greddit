import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post("/", async (req, res) => {
    try {
        console.log("req", req.params, req.body);
        const {fname, lname, username, 
            email, age, cnum, password} = req.body;

        let user = await User.findOne({email});

        if (user)
            return res.status(400).send({ errors: [{msg: "Email already exists"}] })

        // user = await User.findOne({username});

        // if (user)
        //         return res.status(400).send({ errors: [{msg: "Username already exists"}] })
    
        user = new User({fname, lname, username, 
            email, age, cnum, password});

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.send(user);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});


export default router;
