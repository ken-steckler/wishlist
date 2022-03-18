const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    title: String,
    price: String,
    url: String
});

module.exports = mongoose.model('Gift', GiftSchema);