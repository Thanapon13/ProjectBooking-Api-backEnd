const orderControoler = require("../controllers/order-controller");
const express = require("express");

const router = express.Router();

router.post("/", orderControoler.createOrder);
router.get("/getorder", orderControoler.getOrder);

module.exports = router;
