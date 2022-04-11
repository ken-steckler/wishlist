const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Gift = require('../models/gift');
const {isLoggedIn, isAuthor } = require('../middleware')

// All groups
router.get('/', async (req, res) => {
    if(!req.user) {
        res.render('groups/home');
    }
    const groups = await Group.find({});
    res.render('groups/index', { groups });
});

// Creating a new group requires user to be logged in
router.get('/new', isLoggedIn, (req, res) => {
    res.render('groups/new');
});

router.post('/', isLoggedIn, async (req, res, next) => {
    const group = new Group(req.body.group);
    group.author = req.user._id;
    await group.save();
    req.flash('success', 'Successfully made a new group!');
    res.redirect(`groups/${group._id}`);
});

router.get('/:id', isLoggedIn, async (req, res) => {
    // .populate will render the gifts with corresponding group
    const user = req.user.username;
    const userId = req.user.id;
    const userGifts = req.user.gifts;
    console.log("ello")
    const group = await Group.findById(req.params.id).populate({
        path: 'gifts',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!group) {
        req.flash('error', "Group not found!");
        return res.redirect('/groups');
    }
    res.render('groups/details', { group, user, userId, userGifts });
}); 

// Editing and Updating a group
router.get('/:id/edit', isAuthor, isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const group = await Group.findById(id);
    if(!group) {
        req.flash('error', "Group not found!");
        return res.redirect('/groups');
    }
    res.render('groups/edit', { group });
});

router.put('/:id', isAuthor, isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const group = await Group.findByIdAndUpdate(id, {...req.body.group});
    req.flash('success', "Successfully updated your group!")
    res.redirect(`/groups/${group._id}`);
});

// Deleting a group
router.delete('/:id', isAuthor, isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Group.findByIdAndDelete(id);
    req.flash('success', 'Successfully removed your group')
    res.redirect('/groups')
});

module.exports = router;