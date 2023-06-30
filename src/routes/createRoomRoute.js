const express = require("express");
const upload = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authenticate");
const createRoomController = require("../controllers/createRoom-controller");

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
  createRoomController.createRoom
);

router.get(
  "/getCreateRoomController",
  createRoomController.getCreateRoomController
);

module.exports = router;
