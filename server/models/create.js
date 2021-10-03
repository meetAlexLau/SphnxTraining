const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objectSchema = new Schema({
    text: {
        type: String
    },
    color: {
        type: String
    },
    font: {
        type: String
    },
    fontSize: {
        type: Number
    } },
    {
        collection: 'objects'
    })

module.exports = mongoose.model('Objects', objectSchema)