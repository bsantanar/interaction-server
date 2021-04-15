const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'fullname is necessary']
    },
    degree: {
        type: String,
        required: [true, 'degree is required']
    },
    projectsIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    image: {
        type: Buffer
    },
    active: {
        type: Boolean,
        required: [true, 'active is required']
    },
    contributionDate: {
        type: Date,
        required: [true, 'contribution date is required']
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    category: [{
        type: mongoose.Types.ObjectId,
        required: [true, 'category is necessary'],
        ref: 'Category'
    }]
});

module.exports = mongoose.model('Member', memberSchema);
