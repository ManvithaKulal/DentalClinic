const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked",
  },
  createdAt: { type: Date, default: Date.now },
});

appointmentSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
