import express from 'express';
import Post from '../models/Post.js';
import SubGreddit from '../models/Subgreddit.js';
import User from '../models/User.js';

const router = express.Router();

// Create a Post
router.post('/:id/create', async (req,res) => {
    try {
        const {posts, postedBy} = req.body;
        
        const {id} = req.params;
        var postedIn = id;
        console.log(postedIn);
        // let moderator = [id];

        const sub = await SubGreddit.findById(id);
        sub.post = sub.post + 1;

        const banWords = sub.banWords;
        // console.log(banWords);
        const regex = new RegExp(banWords.join('|'), 'gi');

        var alert = false;

        if (regex.test(posts)) {
            console.log("Text contains ban words");
            // console.log(text);
            alert = true;
        }
        else {
            // console.log("Text is completely fine");
            alert = false;
        }

        const text = posts.replace(regex, match => '*'.repeat(match.length));


        const upvotes = 0;
        const downvotes = 0;
        
        console.log("postedBy" + postedBy);

        const postBy = await User.findById(postedBy);
        const postedByName = postBy.username;
    
        let post = new Post({text, postedIn, 
            postedBy, upvotes, downvotes, postedByName});


        await post.save();
        await sub.save();
        res.send(alert);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Get posts posted in a subreddit
router.get('/:id/getposts', async (req,res) => {
    try {

        const {id} = req.params;
        // console.log(mod_id);
        let posts = await Post.find({postedIn:id});
        res.send(posts);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Upvotes
router.put('/:id/upvote', async (req,res) => {
    try {

        const {id} = req.params;
        // console.log(mod_id);
        let posts = await Post.findById(id);
        var upvotes = posts.upvotes;
        var add = upvotes + 1;
        posts.upvotes = add;

        await posts.save();
        res.send(posts);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Downvotes
router.put('/:id/downvote', async (req,res) => {
    try {

        const {id} = req.params;
        // console.log(mod_id);
        let posts = await Post.findById(id);
        var downvotes = posts.downvotes;
        var add = downvotes + 1;
        posts.downvotes = add;

        await posts.save();
        res.send(posts);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Save a post
router.put('/:id/save', async (req,res) => {
    try {

        const {id} = req.params;
        const {post_id} = req.body;
        console.log(post_id);
        let user = await User.findById(id);
        
        user.saved_posts.push(post_id);

        await user.save();
        res.send(user);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});


// Comments
router.put('/:id/comment', async (req,res) => {
    try {

        const {id} = req.params;
        const {comment} = req.body;
        // console.log(mod_id);
        let posts = await Post.findById(id);
        
        posts.comments.push(comment);

        await posts.save();
        res.send(posts);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

export default router;
