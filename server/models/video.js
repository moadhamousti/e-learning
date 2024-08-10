const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    videoLinks: [String], // Video links specific to this video entity
    course: { type: Schema.Types.ObjectId, ref: 'Course' }, // Reference to the linked course
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
