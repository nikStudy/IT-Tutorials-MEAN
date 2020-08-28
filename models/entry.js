const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create entry Schema
const EntrySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    short_descrip: {
        type: String,
        required: [true, 'Short description field is required']
    },
    full_descrip: {
        type: String
    },
    image: {
        type: String,
        required: [true, 'Image field is required']
    },
    author: {
        type: String,
        required: [true, 'Author field is required']
    },
    enteredDate: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Number,
        default: 1
    },
    message: {
        type: String,
        default: 'New Post Created'
    }
});

// create entry model
const Entry = mongoose.model('entry', EntrySchema);

module.exports = Entry;