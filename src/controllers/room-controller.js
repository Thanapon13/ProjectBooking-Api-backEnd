const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { User, Room } = require("../models");

exports.createRoom = async (req, res, next) => {
  try {
    let value;

    if (!req.files.roomImage) {
      createError("room image is required");
    }

    if (req.files.roomImage) {
      const roomImage = await cloudinary.uploadRoomImage(
        req.files.roomImage[0].path
      );
      console.log(req.files.roomImage, "req.files.roomImage");
      value = { roomImage };
    }

    console.log(value, "value");
    value.title = req.body.title;
    value.price = Number(req.body.price);
    value.address = req.body.address;
    value.description = req.body.description;
    value.categoryId = Number(req.body.categoryId);
    value.provinceId = Number(req.body.provinceId);
    value.userId = Number(req.body.userId);

    // console.log(value, "value");

    const room = await Room.create(value);

    // console.log(room, "room");

    res.status(200).json({ room });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.roomImage) {
      fs.unlinkSync(req.files.roomImage[0].path);
    }
  }
};
