import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const commentQuesSchema = mongoose.Schema({
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
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("commentQues", commentQuesSchema);