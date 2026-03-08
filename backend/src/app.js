const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/gallery", galleryRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Dental Clinic API is running" });
});

module.exports = app;
