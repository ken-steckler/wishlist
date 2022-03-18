const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: String,
    date: String
});

module.exports = mongoose.model('Group', GroupSchema)