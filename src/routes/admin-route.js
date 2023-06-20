const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/getPaymentUser", adminController.getPaymentUser);

router.patch(
  "/statusUpdataOrderConfirmed",
  adminController.updateOrderConfirmed
);

router.patch("/statusUpdataOrderCancel", adminController.updateOrderCancel);

router.patch(
  "/statusUpdataReservationPaymentConfirmed",
  adminController.updateReservationPaymentConfirmed
);

router.patch(
  "/statusUpdataReservationPaymentCancel",
  adminController.updateReservationPaymentCancel
);

router.delete(
  "/deleteReservationPayment/:roomId",
  adminController.deleteReservationPayment
);

router.delete(
  "/deleteReservationOrder/:roomId",
  adminController.deleteReservationOrder
);

// router.patch("/statusUpdataConfirmed", adminController.statusUpdataConfirmed);

module.exports = router;
