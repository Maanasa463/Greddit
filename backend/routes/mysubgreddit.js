import express from 'express';
import SubGreddit from '../models/Subgreddit.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Post from '../models/Post.js';
// import { reset } from 'nodemon';

const router = express.Router();

// Create a subgreddit
router.post('/:id/create', async (req,res) => {
    try {
        const {name, description, 
            tags, banWords} = req.body;
        
        const {id} = req.params;
        console.log(id);
        let moderator = [id];

        const post = 0;
        console.log(post)
        
        let subgreddit = await SubGreddit.findOne({name});
            
        if (subgreddit)
            return res.status(400).send({errors: [{msg: "Subgreddit already exists"}]});

        subgreddit = new SubGreddit({name, description, 
            tags, banWords, moderator, post});

        await subgreddit.save();
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }

});

// Get details of all subgreddits of current user
router.get('/mysub', auth, async (req,res) => {
    try {

        const mod_id = req.user.id;
        // console.log(mod_id);
        let subgreddit = await SubGreddit.find({moderator:mod_id});
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Delete a subgreddit 
router.post('/:id/delete', async (req, res) => {
    try {
        const {id} = req.params;
        // const sub_id = JSON.stringify({id})
        console.log(id);

        const subgreddit = await SubGreddit.findByIdAndDelete(id);
        const posts = await Post.deleteMany({postedIn: id});
        // const rest = await SubGreddit.find();
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Get details of a sub
router.get('/:id/get', async (req, res) => {
    try {
        const {id} = req.params;
        // const sub_id = JSON.stringify({id})
        console.log(id);

        const subgreddit = await SubGreddit.findById(id);
        // const rest = await SubGreddit.find();
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Get users of the subgreddits
router.get('/:id/users', async (req,res) => {
    try {

        let users = [];
        // const sg_name = req.body;
        const {id} = req.params;

        const sg = await SubGreddit.findById(id);

        const mod = await User.findById(sg.moderator[0]);

        users[0] = mod.username;

        let i = 1;

        if ((sg.unblocked).length != 0)
        { 
            for (i = 1; i < 1 + (sg.unblocked).length; i++)
                {
                    const user = await User.findById(sg.unblocked[i - 1]);
                    console.log(user.username);
                    users[i] = user.username;
                }
        } 

        users[i] = "----";

        if ((sg.blocked).length != 0)
            for (let j = i + 1; j < i + 1 + (sg.blocked).length; j++)
            {
                const user = await User.findById(sg.blocked[j - (i + 1)]);
                console.log(user.username);
                users[j] = user.username;
            }
        
        res.send(users);
          
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Pending joining requests
router.get('/:id/pending', async (req,res) => {
    try {

        let requested = [];
        // const sg_name = req.body;
        const {id} = req.params;

        const sg = await SubGreddit.findById(id);

        for (let i = 0; i < (sg.requested).length; i++)
        {
            const user = await User.findById(sg.requested[i]);
            // console.log(user.username);
            requested[i] = user.username;
        }
        
        res.send(requested);       
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});


// Accepting a request
router.post('/:id/accept_req', async (req,res) => {
    try {
        const {id} = req.params;
        const {reqname} = req.body;

        console.log(reqname);

        const subgreddit = await SubGreddit.findById(id);
        
        subgreddit.unblocked.push(reqname);
        subgreddit.requested.pull(reqname);

        const new_user = new Date().getTime();
        const created = new Date(subgreddit.createdAt).getTime();

        // const num_followers = subgreddit.moderator.length + subgreddit.unblocked.length + subgreddit.blocked.length + 1;

        // const growth = (num_followers / Math.floor((new_user - created) / 1000));
        // subgreddit.user_update = growth;
        
        await subgreddit.save();
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Denying a request
router.post("/:id/reject", async (req,res) => {
    try {
        const {id} = req.params;
        const {rem} = req.body;
        const subgreddit = await SubGreddit.findById(id);

        // console.log(rem);
        // console.log(id);
        // console.log({rem});

        subgreddit.requested.pull(rem);
        await subgreddit.save();
        res.send(subgreddit);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

router.put('/:id/req', async (req, res) => {
    try {
        // console.log("req", req.params, req.body);
        const {id} = req.params;
        const {request} = req.body;

        // console.log

        const sub = await SubGreddit.findById(id); // most efficient
        // console.log(typeof(follower));

        // sub.unblocked.push(req);
        sub.requested.push(request);

        await sub.save();
        res.send(sub);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

router.get('/:id/growth', async (req,res) => {
    try {
        // console.log("req", req.params, req.body);
        const {id} = req.params;
        console.log(id);
        // const {request} = req.body;
        const sub = await SubGreddit.findById(id); 

        await sub.save();
        // res.send(sub);

        res.send(sub);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

export default router;
