var express = require("express");
var router = express.Router();
const userController = require("../Controllers/User.Controller");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// routes/userRoutes.js

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

module.exports = router;
