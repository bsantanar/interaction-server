const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is necessary']
    },
    password: {
        type: String,
        required: [true, 'password is necessary']
    }
});

module.exports = mongoose.model('User', userSchema);