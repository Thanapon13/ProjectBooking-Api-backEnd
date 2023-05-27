const bookingController = require("../controllers/booking-controller");
const express = require("express");

const router = express.Router();

router.post("/:roomId", bookingController.addBooking);

module.exports = router;
