const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");

router.post("/createdonor", donorController.createDonor);
router.get("/donor", donorController.getDonors);
router.get("/peticulardonor/:email", donorController.getDonorsByEmail);
router.put("/updateID/:id", donorController.updateDonorID);
router.put("/update-donor/:email", donorController.updateDonor);

router.delete("/:id", donorController.deleteDonor);

module.exports = router;
