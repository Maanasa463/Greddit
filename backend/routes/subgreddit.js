import express from 'express';
import SubGreddit from '../models/Subgreddit.js';
import Post from '../models/Post.js';
import User from '../models/User.js'

const router = express.Router();

// Getting all subgreddits
router.get('/:id/subs', async (req,res) => {
    try {

        const {id} = req.params

        console.log(typeof(id));

        var subgs = []
  
        // Has joined the subgreddit 
        let subgreddit = await SubGreddit.find({
            $or: [
              { unblocked: id},
              { blocked: id}
            ]
        });

        console.log("----")

        var updatedSubs = subgreddit.map(sub => ({ ...sub.toObject(), isJoined: true }));
        console.log(updatedSubs);

        updatedSubs.map(function (sub) {
            console.log(sub)
            subgs.push(sub) 
         }) 

        // Is mod of the subgreddits
        subgreddit = await SubGreddit.find({moderator: id});
        updatedSubs = subgreddit.map(sub => ({ ...sub.toObject(), isMod: true}));

        updatedSubs.map(function (sub) {
            subgs.push(sub) 
         }) 


        // Has left subgreddit
        subgreddit = await SubGreddit.find({left:id});
        
        updatedSubs = subgreddit.map(sub => ({ ...sub.toObject(), isLeft: true })); // add new field to users array

        updatedSubs.map(function (sub) {
           subgs.push(sub) 
        }) 

        // Has not joined subgreddit
        subgreddit = await SubGreddit.find({
            $and: [
              { moderator: {$ne: id}},
              { unblocked: {$ne: id}},
              { blocked: {$ne: id}},
              { left: {$ne: id}}
            ]
          });
        
        updatedSubs = subgreddit.map(sub => ({ ...sub.toObject(), isJoined: false }));

        updatedSubs.map(function (sub) {
            console.log(sub)
            subgs.push(sub) 
        }) 

        // subgs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
        console.log(subgs) 

        res.send(subgs)

    }
    
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});


// Leaving a subgreddit
router.post('/:id/leave', async (req,res) => {
    try {
        const {id} = req.params;
        const {reqname} = req.body;

        console.log(reqname);

        const subgreddit = await SubGreddit.findById(id);
        
        subgreddit.unblocked.pull(reqname);
        subgreddit.blocked.pull(reqname);
        subgreddit.left.push(reqname);
        
        await subgreddit.save();
        res.send(subgreddit);
    }

    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Search bar
router.get('/:search', async (req,res) => {
    try {

        const {search} = req.params

        console.log(typeof(search));

        let subgreddit = await SubGreddit.find({name: {$regex: new RegExp(search, 'i')}});
        res.send(subgreddit);
    }
    
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});

// Search by tags
router.get('/:searchtags/search', async (req,res) => {
    try {

        const {searchtags} = req.params
        console.log("jbd" + req.params);

        console.log("jbd" + searchtags);

        const search = searchtags.split(",");

        console.log(search);

        let subgreddit = await SubGreddit.find({tags: {$regex: new RegExp(search.join('|'), 'i')}});
        res.send(subgreddit);
    }
    
    catch (err) {
        console.error('Error: ', err);
        res.status(500).send({errors: [{msg: "Server error"}] });

    }
});




export default router;
