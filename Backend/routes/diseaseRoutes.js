const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");
const upload = require('../middleware/uploads'); 



router.post("/createdisease", upload.single('image'), diseaseController.createDisease);
router.get("/disease", diseaseController.getDiseases);          
router.put("/:id", diseaseController.updateDisease);        
router.delete("/:id", diseaseController.deleteDisease);    

module.exports = router;
