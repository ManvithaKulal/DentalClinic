const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/generateSlots");

// GET /appointments/slots?date=YYYY-MM-DD
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }

    const allSlots = generateSlots();

    const bookedAppointments = await Appointment.find({
      date,
      status: { $ne: "cancelled" },
    });

    const bookedSlots = bookedAppointments.map((a) => a.timeSlot);
    const availableSlots = allSlots.map((slot) => ({
      time: slot,
      available: !bookedSlots.includes(slot),
    }));

    res.json(availableSlots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch slots", error: error.message });
  }
};

// POST /appointments/book
exports.bookAppointment = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;

    if (!date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Date and timeSlot are required" });
    }

    const allSlots = generateSlots();
    if (!allSlots.includes(timeSlot)) {
      return res.status(400).json({ message: "Invalid time slot" });
    }

    const existing = await Appointment.findOne({
      date,
      timeSlot,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      date,
      timeSlot,
      status: "booked",
    });

    res.status(201).json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book appointment", error: error.message });
  }
};

// GET /appointments/my
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};
