const express = require("express");
const upload = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authenticate");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.patch(
  "/",
  authenticateMiddleware,
  upload.fields([
    {
      name: "roomImage",
      maxCount: 7
    }
  ]),
  roomController.createRoom
);

router.get("/getRoomProduct", roomController.getRoomProduct);

module.exports = router;
