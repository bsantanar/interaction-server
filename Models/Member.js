const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const memberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is necessary']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is necessary']
    },
    description: {
        type: String
    },
    degree: {
        type: String
    }
});

module.exports = mongoose.model('Member', memberSchema);