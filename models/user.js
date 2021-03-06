const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Gift = require("./gift");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gift",
    },
  ],
  username: {
    type: String,
    required: true,
    unique: true,
  },
  groupsInvited: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Gift.deleteMany({
      _id: {
        $in: doc.gifts,
      },
    });
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
