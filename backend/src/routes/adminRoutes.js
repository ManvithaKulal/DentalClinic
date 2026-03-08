const router = require("express").Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// All admin routes require auth + admin role
router.use(authMiddleware, roleMiddleware("admin"));

// Get all appointments
router.get("/appointments", adminController.getAllAppointments);

// Get all patients
router.get("/patients", adminController.getAllPatients);

// Cancel an appointment
router.delete("/appointment/:id", adminController.cancelAppointment);

module.exports = router;
