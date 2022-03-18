const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const methodOverride = require('method-override');
const Gift = require('./models/gifts');
const Group = require('./models/group')
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/localGift', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database connected")
})

// in order to parse the body in a post request
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// All groups
app.get('/groups', async (req, res) => {
    const groups = await Group.find({});
    res.render('groups/index', { groups })
})

// Create
app.get('/groups/new', (req, res) => {
    res.render('groups/new')
})

app.post('/groups', async (req, res) => {
    const group = new Group(req.body.group);
    await group.save();
    res.redirect(`groups/${group._id}`)
})

// Find by Id
app.get('/groups/:id', async (req, res) => {
    const group = await Group.findById(req.params.id)
    res.render('groups/details', { group });
})

// Editing a wish list of a group
app.get('/groups/:id/edit', async (req, res) => {
    const group = await Group.findById(req.params.id)
    res.render('groups/edit', { group })
})

app.pout('/groups/:id', async (req, res) => {
    res.send('It worked!')
})



// app.get('/makegift', async (req, res) => {
//     const gift = new Gift({
//         title: 'coffee',
//         price: '$10',
//         url: 'https://bluebottlecoffee.com/'
//     })
//     await gift.save();
//     res.send(gift)
// })


// app.get('/makegroup', async (req, res) => {
//     const group = new Group({
//         name: 'Kens BDAY',
//         date: '07/03/2022'
//     })
//     await group.save();
//     res.send(group)
// })

app.listen(PORT, () => {
    console.log(`Serving on PORT ${PORT}`)
})