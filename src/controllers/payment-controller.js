const { Payment, OrderStatus, ReservationPayment } = require("../models");

exports.createPayment = async (req, res, next) => {
  try {
    const value = {
      creditCardNumber: Number(req.body.creditCardNumber),
      expirationDate: req.body.expirationDate,
      cvv: Number(req.body.cvv),
      zipCode: Number(req.body.zipCode),
      country: req.body.country,
      orderId: req.body.orderId ? Number(req.body.orderId) : null,
      reservationPaymentId: req.body.reservationPaymentId
        ? Number(req.body.reservationPaymentId)
        : null
    };

    console.log(
      "Value----------------------------------------------------------------:",
      value
    );

    await Payment.create(value);

    if (value.orderId) {
      await OrderStatus.create({
        orderId: value.orderId,
        status: "WAITING",
        date: new Date()
      });
    }

    if (value.reservationPaymentId) { 
      await OrderStatus.create({
        reservationPaymentId: value.reservationPaymentId,
        status: "WAITING",
        date: new Date()
      });
    }

    res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    next(err);
    // console.log("req.body:", req.body);
  }
};
