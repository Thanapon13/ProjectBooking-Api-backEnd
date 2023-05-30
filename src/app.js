// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const provinceRoute = require("./routes/province-Route");
const roomRoute = require("./routes/room-route");
const cartsRoute = require("./routes/carts-route");
const orderRoute = require("./routes/order-route");
const paymentRoute = require("./routes/payment-route");
const bookingRoute = require("./routes/booking-route");
const reservationPaymentRoute = require("./routes/reservationPayment-Route");
const authenticateMiddleware = require("./middlewares/authenticate");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "to many requests, please try again later" }
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json()); //ทำการ  passing body ในรูปแบบที่ request body ส่งมาใน format ที่เรียกว่า appication/json คือข้อมูที่ส่งผ่าน axios

app.use("/auth", authRoute);
app.use("/user", authenticateMiddleware, userRoute);
app.use("/province", provinceRoute);
app.use("/room", roomRoute);
app.use("/carts", authenticateMiddleware, cartsRoute);
app.use("/order", authenticateMiddleware, orderRoute);
app.use("/payment", authenticateMiddleware, paymentRoute);
app.use("/booking", authenticateMiddleware, bookingRoute);
app.use("/reservationPayment", authenticateMiddleware, reservationPaymentRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(chalk.yellowBright.italic.bold`server runnig on port: ${port}`);
});
