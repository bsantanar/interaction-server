const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: [true, 'projectId is required'],
        ref: 'Project'
    },
    url: {
        type: String,
        required: [true, 'url is required']
    },
    image: {
        type: Buffer
    }
});

module.exports = mongoose.model('Resource', resourceSchema);