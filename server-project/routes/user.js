const userController = require("../controllers/user");
const md_auth = require('../middlewares/authenticatedValidation');


const express = require("express");

const router = express.Router();


router.post("/new-user", [md_auth.ensureAuth], userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);
//.put("/:id", userController.updateUserById);


module.exports = router;