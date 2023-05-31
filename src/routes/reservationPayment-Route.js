const reservationPaymentControoler = require("../controllers/reservationPayment-controoler");
const express = require("express");

const router = express.Router();

router.post("/", reservationPaymentControoler.createReservationPayment);

module.exports = router;
