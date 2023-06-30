const express = require("express");
const upload = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authenticate");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/getRoomProduct", roomController.getRoomProduct);

module.exports = router;
