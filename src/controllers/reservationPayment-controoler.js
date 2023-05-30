const { ReservationPayment, Reservation } = require("../models");

exports.createReservationPayment = async (req, res, next) => {
  try {
    const reservationData = await Reservation.findOne({
      where: {
        id: req.body.id
      }
    });

    // console.log("--------------------------------------------------");
    // console.log("req.body.id:", req.body.id);
    // console.log("--------------------------------------------------");
    // console.log("reservationData:", reservationData);
    // console.log("--------------------------------------------------");
    // console.log(JSON.parse(JSON.stringify(reservationData)), "reservationData");

    const pureReservationData = JSON.parse(JSON.stringify(reservationData));

    const createReservationData = {
      startDate: pureReservationData.startDate,
      endDate: pureReservationData.endDate,
      price: pureReservationData.price,
      total: pureReservationData.total,
      userId: pureReservationData.userId,
      roomId: pureReservationData.roomId
    };

    // console.log("createReservationData:", createReservationData);
    const reservationPayment = await ReservationPayment.create(
      createReservationData
    );
    // console.log("reservationPayment:", reservationPayment);

    await Reservation.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json({ reservationPayment });
  } catch (err) {
    next(err);
  }
};

// getReservation

exports.getReservation = async (req, res, next) => {
  try {
    const getReservation = await Reservation.findOne({
      attributes: ["id"]
    });

    res.status(200).json({ getReservation });
  } catch (err) {
    next(err);
  }
};
