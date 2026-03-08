const User = require("../models/User");

// Get current logged-in user
exports.getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.user);
};

// Update user profile (name + phone after first Google login)
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true },
    );
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

// Logout
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
};
