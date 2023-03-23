module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      ratring: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    { underscord: true }
  );

  return Review;
};
