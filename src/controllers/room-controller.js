const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { Room } = require("../models");

exports.createRoom = async (req, res, next) => {
  try {
    let value;
    if (!req.files) {
      createError("room image is required");
    }

    console.log(req.files, "req.files----------");

    // if (req.files.length > 0) {
    //   for (const file = 0; file < req.files.length; file++) {
    //     // Upload file to Cloudinary
    //     const roomImage = await cloudinary.uploadRoomImage(file.path);
    //     console.log("Uploaded file:", roomImage);
    //   }
    // }
    // value = { roomImage };
    // console.log(value, "valueRoomImage");

    const roomImage = await cloudinary.uploadRoomImage(
      req.files.roomImage[0].path
      // req.files.path
    );

    console.log("req.files---------------------------", req.files);
    console.log("-----------------------------------");

    value = { roomImage };
    // console.log(value, "value");

    value.title = req.body.title;
    value.price = Number(req.body.price);
    value.address = req.body.address;
    value.description = req.body.description;
    value.categoryId = Number(req.body.categoryId);
    value.provinceId = Number(req.body.provinceId);
    value.userId = Number(req.body.userId);

    // console.log(value, "value");

    await Room.create(value);

    // console.log(room, "room");

    res.status(200).json({ message: "success update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.files) {
      fs.unlinkSync(req.files.roomImage[0].path);
    }
  }
};

exports.getRoomProduct = async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      attributes: [
        "id",
        "title",
        "price",
        "address",
        "description",
        "roomImage"
      ]
    });
    // console.log(rooms, "room---------------------------");

    res.status(201).json({ rooms });
  } catch (err) {
    next(err);
  }
};
