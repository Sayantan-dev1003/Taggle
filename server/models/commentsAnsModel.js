import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const commentAnsSchema = mongoose.Schema({
    content: String,
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("commentAns", commentAnsSchema);