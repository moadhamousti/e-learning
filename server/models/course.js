const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: String,
    description: String,
    course: String,
    image: String, // Image URL
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }], // Array of Video references
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    attachments: [String],
    videoLinks: [String] // Array of YouTube video links specific to the course
}, { timestamps: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
