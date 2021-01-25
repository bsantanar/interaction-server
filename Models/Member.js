const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'fullname is necessary']
    },
    degree: {
        type: String,
        required: [true, 'degree is required']
    },
    birthdate: {
        type: Date,
        required: [true, 'birthdate is required']
    },
    projectsIds: {
        type: [String],
        required: [true, 'projects are required']
    }
});

module.exports = mongoose.model('Member', memberSchema);