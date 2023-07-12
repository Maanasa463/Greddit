import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import auth from '../middleware/auth.js'
import SubGreddit from '../models/Subgreddit.js';
import Post from '../models/Post.js';

const router = express.Router();

// Get list of followers for a particular user
router.get("/followers", auth, async (req, res) => {

    try {
        const users = await User.findById(req.user.id);
        // const username = req.body;
        // console.log(username);
        // const users = await User.findOne(username);
        
        console.log((users.followers).length);
        let flwrs = [];

        for (let i = 0; i < (users.followers).length; i++)
        {
            // const flwrs = users.followers[i];
            const user = await User.findOne(users.followers[i]);
            console.log(user.username);
            flwrs[i] = user.username;
        }

        res.send(flwrs);

    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});


// Get list of following for a particular user
router.get("/following", auth, async (req, res) => {

    try {
        // const username = req.body;
        const users = await User.findById(req.user.id);

        // console.log(username);
        // const users = await User.findOne(username);
    
        // console.log((users.following).length);
        var flwrs = [];

        for (let i = 0; i < (users.following).length; i++)
        {
            // const flwrs = users.followers[i];
            const user = await User.findOne(users.following[i]);
            console.log(user.username);
            flwrs[i] = user.username;
            JSON.stringify(flwrs[i]);
        }

        res.send(flwrs);

    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

// edit details of the user
router.put("/edit", auth, async (req, res) => {
    try {

        // console.log("req.user", req.user);
        // const {id} = req.params; 
        const {fname, lname, username, age, cnum} = req.body;

        // console.log("username" + username);
        console.log(username);
        console.log(fname);
        console.log(lname);
        console.log(age);
        console.log("" + cnum);
    
        // const users = await User.findOne({username});
        const users = await User.findById(req.user.id);
        
        // Change fname if required
        if(fname === "" || fname === undefined) 
            users.fname = users.fname;
        else 
            users.fname = fname;

        // Change lname if required
        if(lname === "" || lname === undefined) 
            users.lname = users.lname;
        else 
            users.lname = lname;
        
        // Change age if required
        if(age === "" || age === undefined ) 
            users.age = users.age;
        else 
            users.age = age;

        // Change cnum if required
        if(cnum === undefined || cnum === "") 
            users.cnum = users.cnum;
        else 
            users.cnum = cnum;

        await users.save();
        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});

// Add followers
router.put('/:id/followers', async (req, res) => {
    try {
        // console.log("req", req.params, req.body);
        const {id} = req.params;
        const {follower} = req.body;

        const user = await User.findById(id); // most efficient
        // console.log(typeof(follower));

        user.followers.push(follower);

        await user.save();
        res.send(user);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

// Remove followers
router.post("/:id/rem_follower", async (req,res) => {
    try {
        const {id} = req.params;
        const {rem} = req.body;
        const users = await User.findById(id);
        // console.log

        users.followers.pull(rem);
        await users.save();
        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

// Add following
router.put('/:id/following', async (req, res) => {
    try {
        // console.log("req", req.params, req.body);
        const {id} = req.params;
        const {following} = req.body;

        const user = await User.findById(id); // most efficient
        // console.log(typeof(follower));

        user.following.push(following);

        await user.save();
        res.send(user);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

// Unfollow
router.post("/:id/unfollow", async (req,res) => {
    try {
        const {id} = req.params;
        const {rem} = req.body;
        const users = await User.findById(id);

        users.following.pull(rem);
        await users.save();
        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});

// Get user details
router.post("/user", async (req, res) => {
    try {
        const {username} = req.body; 
        const users = await User.findOne({username});
        console.log(users);

        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});

router.get("/try", auth , async (req, res) =>{
    try {
        // const {username} = req.body; 

        const users = await User.findById(req.user.id);
        console.log(users);

        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});

router.get("/savedPost", auth , async (req, res) =>{
    try {
        // const {username} = req.body; 

        const users = await User.findById(req.user.id);
        // console.log(users);

        var post = [];

        for (var i = 0; i < (users.saved_posts).length; i++)
        {
            console.log(users.saved_posts[i])
            const posts = await Post.findById(users.saved_posts[i]);
            post.push(posts);
            
            console.log("---")
            console.log(posts)
            console.log("---")
            
            const sub = await SubGreddit.findById(posts.postedIn);
            // console.log(sub);
            post.push(sub.name);

            console.log(post);

        }

        res.send(post);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }
});

// Remove from saved posts
router.post("/:id/remove_saved", async (req,res) => {
    try {
        const {id} = req.params;
        const {rem} = req.body;
        console.log(rem);
        const users = await User.findById(id);
        // const post = await Post.findOne(rem);

        users.saved_posts.pull(rem);
        await users.save();
        res.send(users);
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });
    }

});



export default router;
