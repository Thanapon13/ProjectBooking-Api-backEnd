module.exports = (sequelize, DataTypes) => {
  const ReservationPayment = sequelize.define(
    "ReservationPayment",
    {
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      price: DataTypes.DECIMAL(10, 2),
      total: DataTypes.INTEGER
    },
    { underscord: true }
  );
  ReservationPayment.associate = db => {
    ReservationPayment.hasMany(db.Payment, {
      foreignKey: {
        name: "reservationPaymentId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    ReservationPayment.hasMany(db.OrderStatus, {
      foreignKey: {
        name: "reservationPaymentId",
        allowNull: true
      },
      onDelete: "RESTRICT"
    });

    ReservationPayment.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: true
      },
      onDelete: "RESTRICT"
    });

    ReservationPayment.belongsTo(db.Room, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return ReservationPayment;
};
