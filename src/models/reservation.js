module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      price: DataTypes.DECIMAL(10, 2),
      total: DataTypes.INTEGER,
      title: DataTypes.STRING
    },
    { underscored: true }
  );

  return Reservation;
};
