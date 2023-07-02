const { where } = require("sequelize");
const {
  User,
  Order,
  Room,
  Payment,
  OrderStatus,
  Category,
  ReservationPayment,
  CreateRoom
} = require("../models");

exports.getPaymentUser = async (req, res, next) => {
  try {
    const paymentUser = await Payment.findAll({
      include: [
        {
          model: Order,
          include: [
            {
              model: Room,
              attributes: ["roomImage", "title", "price", "address", "id"],
              include: [{ model: Category, attributes: ["typeProduct"] }]
            },
            {
              model: User,
              attributes: ["firstName", "lastName", "id"]
            },
            { model: OrderStatus, attributes: ["status", "date"] }
          ]
        },
        {
          model: ReservationPayment,
          include: [
            {
              model: Room,
              attributes: ["roomImage", "title", "price", "address", "id"],
              include: [{ model: Category, attributes: ["typeProduct"] }]
            },
            {
              model: User,
              attributes: ["firstName", "lastName", "id"]
            },
            { model: OrderStatus, attributes: ["status", "date"] }
          ]
        }
      ]
    });

    // console.log("paymentUser:", paymentUser);
    const purePaymentUserData = JSON.parse(JSON.stringify(paymentUser));
    // console.log("purePaymentUserData:", purePaymentUserData);

    purePaymentUserData.forEach(data => {
      if (data.Order) {
        data.Order.Room.roomImage = JSON.parse(data.Order.Room.roomImage);
      } else if (data.ReservationPayment) {
        data.ReservationPayment.Room.roomImage = JSON.parse(
          data.ReservationPayment.Room.roomImage
        );
      }
    });

    // console.log("purePaymentUserData:", purePaymentUserData);

    res.status(201).json({ purePaymentUserData });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderConfirmed = async (req, res, next) => {
  try {
    const updateStatusConfirmed = await OrderStatus.findOne({
      where: {
        orderId: req.body.orderId
      }
    });

    // console.log("req.body.orderId", req.body.orderId);

    if (req.body.action === "confirmed") {
      await OrderStatus.update(
        { status: "CONFIRMED" },
        {
          where: {
            id: updateStatusConfirmed.id
          }
        }
      );
    }
    // console.log("updateStatusConfirmed:", updateStatusConfirmed);

    res.status(200).json({ message: "CONFIRMED" });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderCancel = async (req, res, next) => {
  try {
    const updateStatusCancel = await OrderStatus.findOne({
      where: {
        orderId: req.body.orderId
      }
    });

    // console.log("req.body.orderId", req.body.orderId);

    if (req.body.action === "cancel") {
      await OrderStatus.update(
        { status: "CANCEL" },
        {
          where: {
            id: updateStatusCancel.id
          }
        }
      );
    }
    // console.log("updateStatusCancel:", updateStatusCancel);

    res.status(200).json({ message: "CANCEL" });
  } catch (err) {
    next(err);
  }
};

exports.deletePaymentOrder = async (req, res, next) => {
  try {
    const remove = await Order.findOne({
      where: {
        id: req.params.orderId
      }
    });

    console.log("remove", remove);

    if (!remove) {
      createError("this post was not found", 400);
    }

    await remove.destroy();

    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateReservationPaymentConfirmed = async (req, res, next) => {
  try {
    const updateStatusConfirmed = await OrderStatus.findOne({
      where: {
        reservationPaymentId: req.body.reservationPaymentId
      }
    });

    // console.log("req.body.reservationPaymentId", req.body.reservationPaymentId);

    if (req.body.action === "confirmed") {
      await OrderStatus.update(
        { status: "CONFIRMED" },
        {
          where: {
            id: updateStatusConfirmed.id
          }
        }
      );
    }
    // console.log("updateStatusConfirmed:", updateStatusConfirmed);

    res.status(200).json({ message: "CONFIRMED" });
  } catch (err) {
    next(err);
  }
};

exports.updateReservationPaymentCancel = async (req, res, next) => {
  try {
    const updateReservationPaymentCancel = await OrderStatus.findOne({
      where: {
        reservationPaymentId: req.body.reservationPaymentId
      }
    });

    // console.log("req.body.reservationPaymentId", req.body.reservationPaymentId);

    if (req.body.action === "cancel") {
      await OrderStatus.update(
        { status: "CANCEL" },
        {
          where: {
            id: updateReservationPaymentCancel.id
          }
        }
      );
    }
    // console.log(
    //   "updateReservationPaymentCancel:",
    //   updateReservationPaymentCancel
    // );

    res.status(200).json({ message: "CANCEL" });
  } catch (err) {
    next(err);
  }
};

exports.confirmedCreateRoom = async (req, res, next) => {
  try {
    const createRoom = await CreateRoom.findOne({
      where: {
        id: req.body.id
      }
    });
    console.log("createRoom:", createRoom);

    const pureCreateRoomData = JSON.parse(JSON.stringify(createRoom));
    console.log("pureCreateRoomData:", pureCreateRoomData);

    const createRoomData = {
      roomImage: pureCreateRoomData.roomImage,
      title: pureCreateRoomData.title,
      price: pureCreateRoomData.price,
      address: pureCreateRoomData.address,
      description: pureCreateRoomData.description,
      categoryId: pureCreateRoomData.categoryId,
      provinceId: pureCreateRoomData.provinceId,
      userId: pureCreateRoomData.userId
    };

    const room = await Room.create(createRoomData);
    console.log("room:", room);

    await CreateRoom.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json({ room });
  } catch (err) {
    next(err);
  }
};
