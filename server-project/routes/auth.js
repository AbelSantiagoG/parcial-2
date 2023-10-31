const authController = require("../controllers/auth");
const ensureAuth= require("../middlewares/authenticatedValidation")
const express = require("express");

const router = express.Router();

router
.post('/signin', authController.signin)
.post('/login', authController.login)
.get('/get-me/:id', ensureAuth, authController.getMe);

module.exports = router;