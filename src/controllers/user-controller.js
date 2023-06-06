const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const {
  User,
  Order,
  Room,
  Payment,
  OrderStatus,
  Category,
  ReservationPayment
} = require("../models");

exports.updateProfileImage = async (req, res, next) => {
  try {
    let value;

    const profilePublicId = req.user.profileImage
      ? cloudinary.getPublicId(req.user.profileImage)
      : null;

    if (!req.files.profileImage) {
      createError("profile image is required");
    }

    if (req.files.profileImage) {
      console.log(req.files, "req.files userrr");
      const profileImage = await cloudinary.uploadProfile(
        req.files.profileImage[0].path,
        profilePublicId
      );
      value = { profileImage };
    }

    await User.update(value, { where: { id: req.user.id } });
    res.status(200).json(value);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
    }
  }
};

// update user profile
exports.updateUserInfo = async (req, res, next) => {
  try {
    const value = req.body;
    // console.log(req.body, "req.body");

    await User.update(value, { where: { id: req.user.id } });
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

// userOrderHistorys

exports.userOrderHistorys = async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({
      attributes: ["id", "quantity", "userId", "roomId"],
      include: [
        {
          model: Room,
          attributes: ["roomImage", "title", "price", "address"],
          include: [{ model: Category, attributes: ["typeProduct"] }]
        },
        {
          model: User,
          attributes: ["firstName", "lastName", "id"]
        },
        { model: OrderStatus, attributes: ["status", "date"] },
        {
          model: Payment,
          attributes: [
            "creditCardNumber",
            "expirationDate",
            "cvv",
            "zipCode",
            "country"
          ]
        }
      ]
    });

    const userOrderData = JSON.parse(JSON.stringify(userOrder));

    // เพิ่มการแกะรูปภาพแรกจากอาร์เรย์ roomImage
    userOrderData.forEach(order => {
      order.Room.roomImage = JSON.parse(order.Room.roomImage)[0];
    });

    // console.log("userOrderData:", userOrderData);
    res.status(200).json(userOrderData);
  } catch (err) {
    next(err);
  }
};

exports.getUserOrderHistoryRoomReservationPayment = async (req, res, next) => {
  try {
    const reservationPayment = await ReservationPayment.findAll({
      include: [
        {
          model: Room,
          attributes: ["roomImage", "title", "price", "address"],
          include: [{ model: Category, attributes: ["typeProduct"] }]
        },
        {
          model: User,
          attributes: ["firstName", "lastName", "id"]
        },
        { model: OrderStatus, attributes: ["status", "date"] },
        {
          model: Payment,
          attributes: [
            "creditCardNumber",
            "expirationDate",
            "cvv",
            "zipCode",
            "country"
          ]
        }
      ]
    });

    // console.log("reservationPayment-----", reservationPayment);
    // console.log("---------------------------------------------------------");

    const pureReservationPaymentData = JSON.parse(
      JSON.stringify(reservationPayment)
    );

    // เพิ่มการแกะรูปภาพแรกจากอาร์เรย์ roomImage
    pureReservationPaymentData.forEach(el => {
      el.Room.roomImage = JSON.parse(el.Room.roomImage)[0];
    });
    // console.log("pureReservationPaymentData:  ", pureReservationPaymentData);

    res.status(201).json({ pureReservationPaymentData });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentUser = async (req, res, next) => {
  try {
    const paymentUser = await Payment.findAll({
      include: [
        { model: Order, include: [{ model: Room }] },
        { model: ReservationPayment, include: [{ model: Room }] }
      ]
    });

    // console.log("paymentUser:", paymentUser);
    const purePaymentUserData = JSON.parse(JSON.stringify(paymentUser));
    console.log("purePaymentUserData:", purePaymentUserData);

    res.status(201).json({ purePaymentUserData });
  } catch (err) {
    next(err);
  }
};
