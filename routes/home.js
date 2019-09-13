const express = require("express");
const router = express.Router();

//Rendering Template Engine
router.get("/", (req, res) => {
  res.render("index", { title: "My Express Application", message: "hello" });
});

module.exports = router;
