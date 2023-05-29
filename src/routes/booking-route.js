const bookingController = require("../controllers/booking-controller");
const express = require("express");

const router = express.Router();

router.post("/:roomId", bookingController.createBooking);
router.get("/getbooking", bookingController.getBooking);
router.put("/updateBooking", bookingController.updateBooking);

module.exports = router;
