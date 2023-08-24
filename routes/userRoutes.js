const express = require("express");
const router = express.Router();

const { 
    validateRegistration, validateLogin 
} = require("../middleware/userValidator");

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

router.route("/register").post(validateRegistration,registerUser);
router.route("/login").post(validateLogin,loginUser);

module.exports = router;