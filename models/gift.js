const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    giftName: String,
    giftPrice: String,
    giftLink: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Gift', GiftSchema);