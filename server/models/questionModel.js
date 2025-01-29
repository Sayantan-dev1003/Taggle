import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const questionSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    authorFullname: String,
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
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
        default: []
    }],
    saves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
});

questionSchema.virtual('author', {
    ref: 'user',
    localField: 'authorID',
    foreignField: '_id',
    justOne: true
});

questionSchema.pre('find', function() {
    this.populate('authorID');
});

export default mongoose.model("question", questionSchema);