const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  imageData: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", gallerySchema);
