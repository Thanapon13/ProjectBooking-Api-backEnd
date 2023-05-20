const { Cart, Room, Category } = require("../models");
const createError = require("../utils/create-error");

exports.addCart = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    await Cart.create({
      userId: req.user.id,
      roomId: +roomId,
      quantity: 1
    });

    const cart = await Cart.findAll();

    const newCart = JSON.parse(JSON.stringify(cart)).reduce((acc, curr) => {
      if (!acc[curr.roomId]) {
        acc[curr.roomId] = { ...curr };
      } else {
        acc[curr.roomId] = { ...curr, quantity: curr.quantity + 1 };
      }
      return acc;
    }, {});

    res.json(newCart);
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const getCart = await Cart.findAll({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Room,
          include: [{ model: Category, attributes: ["typeProduct"] }]
        }
      ]
    });
    res.status(200).json({ getCart });
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const remove = await Cart.findOne({
      where: {
        roomId: req.params.roomId
      }
    });
    if (!remove) {
      createError("this post was not found", 400);
    }
    await remove.destroy();
    res.status(200).json({ message: "Delete sucess" });
  } catch (err) {
    next(err);
  }
};
