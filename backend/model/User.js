const mongoose = require('mongoose');
const BSON = require('bson');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: null
    },
    name: {
        type: String,
        required: true,
        default: null
    },
    img: {
        type: String,
      required: false,
      default: null
    },
    team: {
        type: String,
        required: true,
        default: null
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    actualBMI: {
        type: Number,
        required: true,
        default: null
    },
    heartRate: {
        type: Number,
        required: true,
        default: null
    },
    saturation: {
        type: Number,
        required: true,
        default: null
    },
    temperature: {
        type: Number,
        required: true,
        default: null
    },
    steps: {
        type: Number,
        required: true,
        default: null
    },
    sleepQuality: {
        type: Number,
        required: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);