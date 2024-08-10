const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/e-learning-9e559.appspot.com/o/profilPics%2Fde7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?alt=media&token=03d1a2e9-28fc-4396-bbc5-350fbef270e7'
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
