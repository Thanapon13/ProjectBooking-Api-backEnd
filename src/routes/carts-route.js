const cartsController = require("../controllers/carts-controller");
const express = require("express");

const router = express.Router();

router.post("/:roomId", cartsController.addCart);
router.get("/getCart", cartsController.getCart);
router.delete("/:roomId", cartsController.deleteRoom);
module.exports = router;
