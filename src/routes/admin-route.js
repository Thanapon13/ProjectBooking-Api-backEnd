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

router.delete("/:orderId", adminController.deletePaymentOrder);

router.post("/", adminController.confirmedCreateRoom);

module.exports = router;
