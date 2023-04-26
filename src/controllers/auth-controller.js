const { validateRegister } = require("../valedators/auth-validators");
const { User } = require("../models");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: { email: value.email }
    });

    if (user) {
      createError("invalid email or password", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res
      .status(201)
      .json({ message: "register success. please log in to continue." });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
  } catch (err) {
    next(err);
  }
};
