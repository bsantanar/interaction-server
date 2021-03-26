const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is necessary']
    },
    section: {
        type: String,
        required: [true, 'section is necessary']
    }
});

categorySchema.index({name: 1, section: 1}, {unique: true})

module.exports = mongoose.model('Category', categorySchema);