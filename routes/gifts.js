const express = require("express");
const router = express.Router({ mergeParams: true });
const Group = require("../models/group");
const User = require("../models/user");
const Gift = require("../models/gift");
const { isLoggedIn, isAuthor } = require("../middleware");

// This post method will add a new gift to corresponding group
router.post("/", isLoggedIn, isAuthor, async (req, res) => {
  const group = await Group.findById(req.params.id);
  const gift = new Gift(req.body.gift);
  gift.author = req.user._id;
  gift.giftAdded = true;
  group.gifts.push(gift);
  await gift.save();
  await group.save();
  req.flash("success", "New gift added to wishlist!");
  res.redirect(`/groups/${group._id}`);
});

// This delete method allows users to delete their gifts from their wishlist
router.delete("/:giftId", isLoggedIn, isAuthor, async (req, res) => {
  const { id, giftId } = req.params;
  await Group.findByIdAndUpdate(id, { $pull: { gifts: giftId } });
  await Gift.findByIdAndDelete(req.params.giftId);
  req.flash("success", "Gift successfully removed from wishlist!");
  res.redirect(`/groups/${id}`);
});

// Adds gift to associated account when user selects gift
// For every item in the gift, check if item is already added. If so, then return error.
router.post("/add/:giftId", isLoggedIn, async (req, res) => {
  const { id, giftId } = req.params;
  const group = await Group.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const gift = await Gift.findById(req.params.giftId);
  for (i in user.gifts) {
    if (user.gifts[i] == gift.id) {
      req.flash("error", "Cannot add the same item to your list!");
      res.redirect(`/groups/${group._id}`);
      return;
    }
  }
  user.gifts.push(gift);
  if (gift.giftAdded) {
    gift.giftAdded = false;
  }
  gift.giftAddedTo = user.id;
  await gift.save();
  await user.save();
  req.flash("success", "Gift selected!");
  res.redirect(`/groups/${group._id}`);
});

// Removes gift from the user's list and adds back to groups list
router.delete("/remove/:giftId", isLoggedIn, async (req, res) => {
  const { id, giftId } = req.params;
  const group = await Group.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const gift = await Gift.findById(req.params.giftId);
  gift.giftAdded = true;
  await gift.save();
  await group.save();
  await User.findByIdAndUpdate(id, { $pull: { gifts: giftId } });
  await User.findByIdAndDelete(req.params.giftId);
  req.flash("success", "Gift removed!");
  res.redirect(`/groups/${group._id}`);
});

module.exports = router;
