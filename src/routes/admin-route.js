const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/getPaymentUser", adminController.getPaymentUser);
router.patch("/statusUpdataConfirmed", adminController.updateConfirmed);

module.exports = router;
