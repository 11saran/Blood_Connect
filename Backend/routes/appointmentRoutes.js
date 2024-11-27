const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/create", appointmentController.createAppointment);
router.get("/appointment/:id", appointmentController.getAppointmentById);
router.get("/appointment", appointmentController.getAllAppointments);
router.put("/updateAppointment/:email", appointmentController.updateAppointment);
router.delete("/delete-appointment/:id", appointmentController.deleteAppointment);
router.get("/available-slots", appointmentController.getAvailableSlots); // Endpoint for available slots

module.exports = router;
