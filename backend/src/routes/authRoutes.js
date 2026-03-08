const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  },
);

// Get current user
router.get("/me", authController.getMe);

// Update profile (name + phone)
router.put("/update-profile", authMiddleware, authController.updateProfile);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
