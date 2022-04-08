const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeparams to merge params from app.js into this file so that req.params.id is not null
const Group = require("../models/group");
const Gift = require("../models/gift");
const { isLoggedIn, isAuthor } = require("../middleware");

// This post method will add a new gift to corresponding group
router.post("/", isLoggedIn, isAuthor, async (req, res) => {
  const group = await Group.findById(req.params.id);
  const gift = new Gift(req.body.gift);
  gift.author = req.user._id;
  group.gifts.push(gift);
  await gift.save();
  await group.save();
  req.flash("success", "New gift added to wishlist!");
  res.redirect(`/groups/${group._id}`);
});

// router.post('/', isLoggedIn, isGroup, async(req, res) => {

// })

// This delete method allows users to delete their gifts from their wishlist
router.delete("/:giftId", isLoggedIn, isAuthor, async (req, res) => {
  const { id, giftId } = req.params;
  await Group.findByIdAndUpdate(id, { $pull: { gifts: giftId } });
  await Gift.findByIdAndDelete(req.params.giftId);
  req.flash("success", "Gift successfully removed from wishlist!");
  res.redirect(`/groups/${id}`);
});

module.exports = router;
