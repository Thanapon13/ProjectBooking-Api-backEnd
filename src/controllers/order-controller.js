const { Order, Cart } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const cartData = await Cart.findOne({
      where: {
        id: req.body.id
      }
    });
    // console.log("--------------------------------------------------");
    // console.log("req.body.id:", req.body.id);
    // console.log("--------------------------------------------------");
    // console.log("cartData:", cartData);
    // console.log("--------------------------------------------------");
    // console.log(JSON.parse(JSON.stringify(cartData)), "cartData");

    const pureCartData = JSON.parse(JSON.stringify(cartData));

    const createOrderData = {
      quantity: pureCartData.quantity,
      userId: pureCartData.userId,
      roomId: pureCartData.roomId
    };

    // console.log("createOrderData:", createOrderData);

    const order = await Order.create(createOrderData);
    console.log("order:", order);

    await Cart.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json({ createOrderData });
  } catch (err) {
    next(err);
  }
};
