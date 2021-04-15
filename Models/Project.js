const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'projectName is necessary'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    },
    link: {
        type: String,
        required: [true, 'link is necessary']
    },
    image: {
        type: Buffer
    },
    yearInit: {
        type: Number,
        required: [true, 'year is necessary']
    },
    yearEnd: {
        type: Number
    }
});

module.exports = mongoose.model('Project', projectSchema);