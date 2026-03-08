const Gallery = require("../models/Gallery");

// POST /gallery/upload (admin only)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const gallery = await Gallery.create({
      imageData: req.file.buffer,
      contentType: req.file.mimetype,
      uploadedBy: req.user._id,
    });

    res.status(201).json({ _id: gallery._id, createdAt: gallery.createdAt });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
};

// GET /gallery/:id/image — serve a single image as binary
exports.getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.set("Content-Type", image.contentType);
    res.set("Cache-Control", "public, max-age=86400");
    res.send(image.imageData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch image", error: error.message });
  }
};

// GET /gallery — list all gallery entries (without binary data)
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find()
      .select("-imageData")
      .sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch images", error: error.message });
  }
};
