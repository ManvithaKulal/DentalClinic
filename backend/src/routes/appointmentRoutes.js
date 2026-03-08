const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Get available slots for a date
router.get("/slots", appointmentController.getAvailableSlots);

// Book an appointment (auth required)
router.post("/book", authMiddleware, appointmentController.bookAppointment);

// Get my appointments (auth required)
router.get("/my", authMiddleware, appointmentController.getMyAppointments);

module.exports = router;
