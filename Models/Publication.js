const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    year: {
        type: Number,
        required: [true, 'year is necessary']
    },
    author: {
        type: String,
        required: [true, 'author is necessary']
    },
    description: {
        type: String
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Project is necessary']
    }
});

module.exports = mongoose.model('Publication', publicationSchema);