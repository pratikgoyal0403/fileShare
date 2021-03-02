const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    uuid: {
        type: String, 
        required: true
    },
    emailFrom: {
        type: String
    },
    emailTo: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('file', fileSchema);