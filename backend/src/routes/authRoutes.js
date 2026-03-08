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
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      console.error("Google OAuth error:", err);
      return res.redirect(process.env.CLIENT_URL + "/login");
    }
    if (!user) {
      console.error("Google OAuth: no user returned");
      return res.redirect(process.env.CLIENT_URL + "/login");
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Session login error:", loginErr);
        return res.redirect(process.env.CLIENT_URL + "/login");
      }
      return res.redirect(process.env.CLIENT_URL);
    });
  })(req, res, next);
});

// Get current user
router.get("/me", authController.getMe);

// Update profile (name + phone)
router.put("/update-profile", authMiddleware, authController.updateProfile);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
