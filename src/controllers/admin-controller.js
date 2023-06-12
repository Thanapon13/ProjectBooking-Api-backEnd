const {
  User,
  Order,
  Room,
  Payment,
  OrderStatus,
  Category,
  ReservationPayment
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
    console.log("purePaymentUserData:", purePaymentUserData);

    purePaymentUserData.forEach(data => {
      if (data.Order) {
        data.Order.Room.roomImage = JSON.parse(data.Order.Room.roomImage);
      } else if (data.ReservationPayment) {
        data.ReservationPayment.Room.roomImage = JSON.parse(
          data.ReservationPayment.Room.roomImage
        );
      }
    });

    console.log("purePaymentUserData:", purePaymentUserData);

    res.status(201).json({ purePaymentUserData });
  } catch (err) {
    next(err);
  }
};

exports.updateConfirmed = async (req, res, next) => {
  try {
    const updateStatusConfirmed = await OrderStatus.findOne({
      where: {
        orderId: req.body.orderId || null,
        reservationPaymentId: req.body.reservationPaymentId || null
      }
    });

    console.log("req.body.reservationPaymentId", req.body.reservationPaymentId);

    if (req.body.action === "confirmed") {
      console.log("req.body--------------------,", req.body);
      await OrderStatus.update(
        { status: "CONFIRMED" },
        {
          where: {
            id: updateStatusConfirmed.id
          }
        }
      );
    }
    console.log("updateStatusConfirmed:", updateStatusConfirmed);

    res.status(200).json({ message: "CONFIRMED" });
  } catch (err) {
    next(err);
  }
};
