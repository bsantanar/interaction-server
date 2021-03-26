const mongoose = require('mongoose');
const CONSTANTS = require('../Config/Constants')

const Schema = mongoose.Schema;


const activitySchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    },
    image: {
        type: Buffer
    },
    link: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, 'category is necessary'],
        ref: 'Category'
    }
});

module.exports = mongoose.model('Activity', activitySchema);