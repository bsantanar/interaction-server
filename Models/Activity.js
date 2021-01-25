const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const activitySchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    date: {
        type: Date,
        required: [true, 'date is necessary']
    },
    description: {
        type: String
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Project is necessary']
    }
});

module.exports = mongoose.model('Activity', activitySchema);