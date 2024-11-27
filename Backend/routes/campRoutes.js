const express = require("express");
const router = express.Router();
const campController = require("../controllers/campController");
const upload = require('../middleware/uploads'); 

router.post("/createcamp", upload.single('image'), campController.createCamp);
router.get("/camps", campController.getCamps);
router.put("/:id", campController.updateCamp);
router.delete("/:id", campController.deleteCamp);

module.exports = router;
