const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});

// Create basic user model instance
router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      //after registering, req.login will automatically login user
      if (err) return next(err);
      req.flash("success", "Welcome to Giftu!");
      res.redirect("/groups");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

// serving a form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// authenticate middleware
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/groups"; // redirects to last page after logging in
    delete req.session.returnTo; // deletes redirectUrl after logging in
    res.redirect(redirectUrl);
  }
);

// logging out using passport lougout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out!");
  res.redirect("/groups");
});

module.exports = router;
