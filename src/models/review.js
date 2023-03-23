module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      ratring: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    { underscord: true }
  );

  Review.associate = db => {
    Review.belongsTo(db.Reservation, {
      foreignKey: {
        name: "reservationId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Review;
};
