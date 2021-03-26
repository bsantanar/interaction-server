const mongoose = require('mongoose');
const CONSTANTS = require('../Config/Constants')

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
    editorial: {
        type: String
    },
    description: {
        type: String
    },
    doi: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, 'category is necessary'],
        ref: 'Category'
    },
    projectId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }],
});

module.exports = mongoose.model('Publication', publicationSchema);