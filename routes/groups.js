const express = require("express");
const router = express.Router({ mergeParams: true });
const Group = require("../models/group");
const User = require("../models/user");
const Gift = require("../models/gift");
const { isLoggedIn, isAuthor } = require("../middleware");

router.use(
  express.urlencoded({
    extended: true,
  })
);

// All groups
router.get("/", async (req, res) => {
  if (!req.user) {
    res.render("groups/home");
  }
  const groups = await Group.find({});
  res.render("groups/index", { groups, user: req.user });
});

// Creating a new group requires user to be logged in
router.get("/new", isLoggedIn, (req, res) => {
  res.render("groups/new");
});

// When logged in, user can add a new group
router.post("/", isLoggedIn, async (req, res, next) => {
  const group = new Group(req.body.group);
  group.author = req.user._id;
  await group.save();
  req.flash("success", "Successfully made a new group!");
  res.redirect(`groups/${group._id}`);
});

// This GET method will retrieve data from the Group and display on details
router.get("/:id", isLoggedIn, async (req, res) => {
  // .populate will render the gifts with corresponding group
  const user = req.user.username;
  const userId = req.user.id;
  const userGifts = req.user.gifts;
  const group = await Group.findById(req.params.id)
    .populate({
      path: "gifts",
      populate: {
        path: "author",
      },
    })
    .populate("author")
    // Populating users field in Schema to add an invited user
    .populate({
      path: "users",
      populate: {
        path: "users",
      },
    })
    .populate("users");
  if (!group) {
    req.flash("error", "Group not found!");
    return res.redirect("/groups");
  }
  res.render("groups/details", { group, user, userId, userGifts });
});

// This post method will add a new user to corresponding group
router.post("/:id/invite", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  const inviteUser = req.body.inviteUser;
  const invitedUser = await User.findOne({ username: inviteUser });
  const group = await Group.findById(id);
  if (invitedUser == null) {
    req.flash("error", "User not found, please try inviting again!");
    res.redirect(`/groups/${group._id}`);
  }
  // Checks to see if a user already invited in the group
  invitedObjectID = invitedUser._id.valueOf();
  for (i in group.users) {
    if (group.users[i].valueOf() == invitedObjectID) {
      req.flash("error", "User already invited, please invite another user!");
      res.redirect(`/groups/${group._id}`);
    }
  }
  group.users.push(invitedUser);
  invitedUser.groupsInvited.push(group);
  await group.save();
  await invitedUser.save();
  req.flash("success", "A new user has been added to the group!");
  res.redirect(`/groups/${group._id}`);
});

// Editing and Updating a group
router.get("/:id/edit", isAuthor, isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const group = await Group.findById(id);
  if (!group) {
    req.flash("error", "Group not found!");
    return res.redirect("/groups");
  }
  res.render("groups/edit", { group });
});

router.put("/:id", isAuthor, isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByIdAndUpdate(id, { ...req.body.group });
  req.flash("success", "Successfully updated your group!");
  res.redirect(`/groups/${group._id}`);
});

// Deleting a group
router.delete("/:id", isAuthor, isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await Group.findByIdAndDelete(id);
  req.flash("success", "Successfully removed your group");
  res.redirect("/groups");
});

module.exports = router;
