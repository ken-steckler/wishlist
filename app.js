if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Gift = require("./models/gift");
const Group = require("./models/group");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const groups = require("./routes/groups");
const gifts = require("./routes/gifts");

const mongodb_url = process.env.MONGODB_URL;
// "mongodb://localhost:27017/localGift"
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// in order to parse the body in a post request
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOp = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionOp));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //this brings a user in a session
passport.deserializeUser(User.deserializeUser()); //this brings a user out of a session

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/groups", groups);
app.use("/groups/:id/gifts", gifts);

app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

app.listen(PORT, () => {
  console.log(`Serving on PORT ${PORT}`);
});
