import mongoose from "mongoose";

const SgSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
    },
    tags: [{
        type: String,
    }],
    banWords: [{
        type: String,
    }],
    moderator: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    blocked: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    unblocked: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    requested: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],

    left: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    
    post: {
        type: Number,
    },
    
    user_update: {
        type: Number,
    } 
}, 
{
    timestamps: true
});

const SubGreddit = mongoose.model('sg', SgSchema);

export default SubGreddit;