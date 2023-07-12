import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    postedIn: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubGreddit',
    },
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
    comments: [{
        type: String,
    }],
    postedByName: {
        type: String
    }

});

const Post = mongoose.model('post', PostSchema);

export default Post;