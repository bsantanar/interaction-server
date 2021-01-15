const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new Schema({
    projectName: {
        type: String,
        required: [true, 'projectName is necessary'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    }
});

module.exports = mongoose.model('Project', projectSchema);