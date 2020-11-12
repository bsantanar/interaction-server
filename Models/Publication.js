const { number } = require('joi');
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
    }
});

module.exports = mongoose.model('Publication', publicationSchema);