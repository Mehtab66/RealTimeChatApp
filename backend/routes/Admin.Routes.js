var express = require("express");
var router = express.Router();
const AdminController = require("../Controllers/Admin.Controller");

//Login
router.post("/login", AdminController.loginAdmin);

module.exports = router;
