const express = require("express");
const router = express.Router();
const permanentDonationController = require("../controllers/permanentDonationController");

router.post("/create", permanentDonationController.createDonation);
router.get("/donation/:id", permanentDonationController.getDonationById);
router.get("/donations", permanentDonationController.getAllDonations);
router.put("/update-donation/:id", permanentDonationController.updateDonation);
router.delete("/delete-donation/:id", permanentDonationController.deleteDonation);

module.exports = router;
