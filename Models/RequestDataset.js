const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const requestDatasetSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'dataset name is necessary']
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    },
    email: {
        type: String,
        required: [true, 'version is necessary']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('RequestDataset', requestDatasetSchema);