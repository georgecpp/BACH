const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
        required: true
    },
    savedAtDate: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Score', scoreSchema);