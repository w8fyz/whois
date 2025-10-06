var express = require('express');
require('dotenv').config();
var router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({ 
    message: "Hello World!!!",
    endpoints: {
      users: "/users",
      contacts: "/contacts"
    }
  });
});

module.exports = router;
