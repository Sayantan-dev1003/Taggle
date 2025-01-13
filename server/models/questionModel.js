import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const questionSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: {
        type: [String]
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

export default mongoose.model("question", questionSchema);