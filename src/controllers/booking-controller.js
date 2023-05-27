const { Reservation } = require("../models");

exports.addBooking = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const value = {
      userId: req.user.id,
      roomId: +roomId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: Number(req.body.price),
      total: Number(req.body.total)
    };
    // console.log("value:", value);

    await Reservation.create(value);

    res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    next(err);
    console.log("req.body:", req.body);
  }
};
