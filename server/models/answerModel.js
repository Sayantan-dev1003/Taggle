import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const answerSchema = mongoose.Schema({
    content: String,
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("answer", answerSchema);