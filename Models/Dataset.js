const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const datasetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'dataset name is necessary'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    },
    version: {
        type: Number,
        required: [true, 'version is necessary'],
        default: 1
    },
    tags: [{
        type: String,
        required: [true, 'tags are necessary']
    }],
    publications: [{
        type: mongoose.Types.ObjectId,
        required: [true, 'publications are necessary']
    }],
    link: {
        type: String
    },
    permission: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Dataset', datasetSchema);