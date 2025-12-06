const express = require("express");
const { getHotels } = require("../controllers/hotelController.js");

const router = express.Router();

router.get("/", getHotels);

module.exports = router;
