const { Reservation, Room } = require("../models");

exports.createBooking = async (req, res, next) => {
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
    // console.log("req.body:", req.body);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const getBooking = await Reservation.findAll({
      include: [
        {
          model: Room,
          attributes: ["roomImage", "title", "price", "address"]
        }
      ]
    });
    // console.log("getBooking:", getBooking);
    const getBookingData = JSON.parse(JSON.stringify(getBooking));

    // เพิ่มการแกะรูปภาพแรกจากอาร์เรย์ roomImage
    getBookingData.forEach(el => {
      el.Room.roomImage = JSON.parse(el.Room.roomImage)[0];
    });

    // console.log("getBookingData:", getBookingData);
    res.status(200).json(getBookingData);
  } catch (err) {
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const { startDate, endDate, bookingId } = req.body;
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    console.log("bookingId:", bookingId);

    if (!bookingId) {
      // ถ้าไม่มี bookingId ใน req.body ให้ส่งข้อผิดพลาดกลับไป
      return res.status(400).json({ message: "Missing bookingId" });
    }

    await Reservation.update(
      { startDate, endDate },
      { where: { id: bookingId } }
    );

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (err) {
    console.log(err);
    console.log("req.body", req.body);
    next(err);
  }
};
