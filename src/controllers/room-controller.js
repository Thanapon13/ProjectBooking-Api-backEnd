const fs = require("fs");
const { Room, Category } = require("../models");

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
      ],
      include: [{ model: Category, attributes: ["typeProduct"] }]
    });
    // console.log(rooms, "room---------------------------");

    res.status(201).json({ rooms });
  } catch (err) {
    next(err);
  }
};
