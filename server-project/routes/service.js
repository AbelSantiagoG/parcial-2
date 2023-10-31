const serviceController = require('../controllers/service');

const express = require("express");

const router = express.Router();


router
.post("/new-service", serviceController.createService)
.get("/", serviceController.getAllServices)
.get("/:id", serviceController.getServiceById)
.patch("/:id", serviceController.updateServiceById)
.delete("/:id", serviceController.deleteServiceById);


module.exports = router;