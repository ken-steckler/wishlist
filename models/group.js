const mongoose = require('mongoose');
const Gift = require('./gift');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: String,
    date: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gifts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Gift'
        }
    ]
});

GroupSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Gift.deleteMany({
            _id: {
                $in: doc.gifts
            }
        })
    }
})

module.exports = mongoose.model('Group', GroupSchema)