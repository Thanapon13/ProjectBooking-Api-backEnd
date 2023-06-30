const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const { CreateRoom, Category, User } = require("../models");

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
        req.files.roomImage[i].path
      );
      // console.log("roomImage:", roomImage);
      roomImages.push(roomImage);
      // console.log("Uploaded roomImage:", roomImage);
      fs.unlinkSync(req.files.roomImage[i].path);
    }

    const value = {
      roomImage: JSON.stringify(roomImages), // เปลี่ยนจาก roomImages เป็น roomImage
      title: req.body.title,
      price: parseFloat(req.body.price.replace(",", "")),
      address: req.body.address,
      description: req.body.description,
      categoryId: Number(req.body.categoryId),
      provinceId: Number(req.body.provinceId),
      userId: req.body.userId
    };
    console.log("Value:", value);

    await CreateRoom.create(value);

    console.log("CreateRoom:", CreateRoom);

    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    next(err);
  }
};

exports.getCreateRoomController = async (req, res, next) => {
  try {
    const createRoom = await CreateRoom.findAll({
      attributes: [
        "id",
        "title",
        "price",
        "address",
        "description",
        "roomImage"
      ],
      include: [
        { model: Category, attributes: ["typeProduct"] },
        { model: User, attributes: ["firstName", "lastName", "id", "email"] }
      ]
    });

    console.log("createRoom:", createRoom);

    const pureCreateRoomControllerData = JSON.parse(JSON.stringify(createRoom));

    console.log("pureCreateRoomControllerData:", pureCreateRoomControllerData);

    res.status(201).json({ pureCreateRoomControllerData });
  } catch (err) {
    next(err);
  }
};
