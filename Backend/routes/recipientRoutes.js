const express = require("express");
const router = express.Router();
const recipientController = require("../controllers/RecipientController");

router.post("/create", recipientController.createRecipient);
router.get("/recipient/:id", recipientController.getRecipientById);
router.get("/recipients", recipientController.getAllRecipients);
router.put("/update-recipient/:id", recipientController.updateRecipient);
router.delete("/delete-recipient/:id", recipientController.deleteRecipient);

module.exports = router;
