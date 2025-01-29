import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    quesAsked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        default: []
    }],
    answered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
        default: []
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        default: []
    }],
});

export default mongoose.model("user", userSchema);