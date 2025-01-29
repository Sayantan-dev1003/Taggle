import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taggle");

const answerSchema = mongoose.Schema({
    content: String,
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    authorFullname: {
        type: String,
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

answerSchema.virtual('author', {
    ref: 'user',
    localField: 'author',
    foreignField: '_id',
    justOne: true // Only one author
});

answerSchema.pre('find', function() {
    this.populate('author');
});

export default mongoose.model("answer", answerSchema);