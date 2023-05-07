const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { User } = require("../models");

exports.updateProfileImage = async (req, res, next) => {
  try {
    let value;

    if (!req.files.profileImage) {
      createError("profile image is required");
    }

    if (req.files.profileImage) {
      // console.log(req.files, "req.files");
      const profileImage = await cloudinary.upload(
        req.files.profileImage[0].path
      );
      value = { profileImage };
    }

    await User.update(value, { where: { id: req.user.id } });
    res.status(200).json({ message: "success update" });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
    }
  }
};
