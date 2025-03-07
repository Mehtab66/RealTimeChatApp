var express = require("express");
var router = express.Router();
const AdminController = require("../Controllers/Admin.Controller");
router.post("/signup", AdminController.signUpAdmin);

module.exports = router;
