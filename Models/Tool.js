const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is necessary'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    }
});

module.exports = mongoose.model('Tool', toolSchema);