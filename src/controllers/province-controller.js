const { Province } = require("../models");

exports.getProvince = async (req, res, next) => {
  try {
    const provinces = await Province.findAll({});
    // console.log(provinces, "provinces");
    res.status(201).json({ provinces });
  } catch (err) {
    next(err);
  }
};
