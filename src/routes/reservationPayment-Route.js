const reservationPaymentControoler = require("../controllers/reservationPayment-controoler");
const express = require("express");

const router = express.Router();

router.post("/", reservationPaymentControoler.createReservationPayment);
router.get("/getReservation", reservationPaymentControoler.getReservation);

module.exports = router;
