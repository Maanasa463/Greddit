import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    reported: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    subgreddit: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubGreddit',
    },
    concern: {
        type: String,
    },
    postText: {
        type: String,
    },
    reportedByName: {
        type: String
    },
    reportedName: {
        type: String
    },
    Ignore: {
        type: Boolean
    }


});

const Report = mongoose.model('report', ReportSchema);

export default Report;