const { Payment } = require("../models");

exports.createPayment = async (req, res, next) => {
  try {
    const value = {
      creditCardNumber: Number(req.body.creditCardNumber),
      expirationDate: req.body.expirationDate,
      cvv: Number(req.body.cvv),
      zipCode: Number(req.body.zipCode),
      country: req.body.country,
      orderId: Number(req.body.orderId)
    };

    console.log("Value:", value);

    await Payment.create(value);

    res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    next(err);
    console.log("req.query:", req.query);
    console.log("req.body:", req.body);
  }
};
