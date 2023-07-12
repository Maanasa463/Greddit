import express from 'express'
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    // login
    try {   
        const {username, password} = req.body;  
        const user = await User.findOne({username});

        if (!user) 
            return res.status(400).send({errors: [{msg: 'No User found'}]});

        const match = await user.checkPassword(password);

        if (match) {
            const token = user.generateToken();
            return res.send({token})

            // return res.send("success");
        }

    return res.status(400).send({errors: [{msg: 'Invalid Password'}]});
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});


export default router;