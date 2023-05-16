const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { Room } = require("../models");

exports.createRoom = async (req, res, next) => {
  try {
    if (
      !req.files ||
      !req.files.roomImage ||
      req.files.roomImage.length === 0
    ) {
      return res.status(400).json({ message: "Room image is required" });
    }

    const roomImages = [];

    for (let i = 0; i < req.files.roomImage.length; i++) {
      const roomImage = await cloudinary.uploadRoomImage(
        req.files.roomImage[i].path,
        console.log(
          "  req.files.roomImage[i].path",
          req.files.roomImage[i].path
        )
      );
      console.log("roomImage:", roomImage);
      roomImages.push(roomImage);
      console.log("Uploaded roomImage:", roomImage);
      fs.unlinkSync(req.files.roomImage[i].path);
    }
    const value = {
      roomImage: JSON.stringify(roomImages), // เปลี่ยนจาก roomImages เป็น roomImage
      title: req.body.title,
      price: Number(req.body.price),
      address: req.body.address,
      description: req.body.description,
      categoryId: Number(req.body.categoryId),
      provinceId: Number(req.body.provinceId),
      userId: Number(req.body.userId)
    };
    console.log("Value:", value);

    await Room.create(value);

    console.log("Room:", Room);

    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    next(err);
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
