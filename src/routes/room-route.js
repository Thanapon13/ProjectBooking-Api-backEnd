const express = require("express");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "roomImage",
      maxCount: 10
    }
  ]),
  authenticate,
  roomController.createRoom
);

module.exports = router;
