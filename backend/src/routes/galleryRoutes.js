const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Multer config — store in memory for MongoDB binary storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype);
  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload image (admin only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  galleryController.uploadImage,
);

// Get all gallery entries (metadata only)
router.get("/", galleryController.getImages);

// Serve a single image as binary
router.get("/:id/image", galleryController.getImage);

module.exports = router;
