import express from 'express';
import SubGreddit from '../models/Subgreddit.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Post from '../models/Post.js';
import Report from '../models/Report.js'
// import { reset } from 'nodemon';
// import { reset } from 'nodemon';

const router = express.Router();

// Create a subgreddit
router.post('/:id/create', async (req,res) => {
    try {
        const {postId, reportedBy, 
            reported, concern} = req.body;
        
        const {id} = req.params;
        console.log(id);
        let subgreddit = [id];

        let post = await Post.findById(postId);
        let postText = post.text;
        
        let reportedByN = await User.findById(reportedBy);
        let reportedByName = reportedByN.username;
        
        let reportedN = await User.findById(reported);
        let reportedName = reportedN.username;

        let Ignore = false;

        let report = new Report({postId, postText, reportedBy, 
                        reported, concern, subgreddit, reportedByName, reportedName, Ignore});

        await report.save();
        res.send(report);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }

});

// Get reports
router.get('/:id/report', async (req,res) => {
    try {

        let {id} = req.params;

        let report = await Report.find({subgreddit: id})

        // await report.save();
        res.send(report);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }

});

// Block User
router.post('/:id/block', async (req, res) => {
    try {
        let {id} = req.params

        let report = await Report.findById(id)
        let post = await Post.findById(report.postId)
        post.postedByName = "Blocked User"

        await post.save()
        res.send(post)
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] })
    }
});


// Ignore report
router.post('/:id/ignore', async (req,res) => {
    try {

        let {id} = req.params;

        let report = await Report.findById(id)
        report.Ignore = true;
        
        await report.save();
        res.send(report);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }

});

// Delete post, delete post request
router.post('/:id/delete', async (req,res) => {
    try {

        let {id} = req.params;

        let report = await Report.findById(id)

        // console.log(report);

        let postid = report.postId
        let subid = report.subgreddit

        let post = await Post.findByIdAndDelete(postid)
        let sub = await SubGreddit.findById(subid)
        sub.post -= 1;
        let report2 = await Report.findByIdAndDelete(id)
        
        // await report2.save();
        // await post.save();

        res.send(report2);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }

});


export default router;
