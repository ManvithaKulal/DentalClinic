const Appointment = require("../models/Appointment");
const User = require("../models/User");

// GET /admin/appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email phone")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// GET /admin/patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: error.message });
  }
};

// DELETE /admin/appointment/:id
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to cancel appointment", error: error.message });
  }
};
