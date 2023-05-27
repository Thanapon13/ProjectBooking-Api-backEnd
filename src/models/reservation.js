module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      price: DataTypes.DECIMAL(10, 2),
      total: DataTypes.INTEGER
    },
    { underscored: true }
  );

  Reservation.associate = db => {
    Reservation.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Reservation.belongsTo(db.Room, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Reservation.hasMany(db.Review, {
      foreignKey: {
        name: "reservationId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Reservation;
};
