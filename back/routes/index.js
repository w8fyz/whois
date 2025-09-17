var express = require('express');
const {getUsers} = require("../services/userService");
require('dotenv').config();
var router = express.Router();

router.get("/", async (req, res) => {
  let results = getUsers();
  res.send(results).status(200);
});

module.exports = router;
