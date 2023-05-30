module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      creditCardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      expirationDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: true, // เปลี่ยนเป็น true เพื่ออนุญาตให้เป็นค่า null
        onDelete: "RESTRICT"
      },
      reservationPaymentId: {
        type: DataTypes.INTEGER,
        allowNull: true, // เปลี่ยนเป็น true เพื่ออนุญาตให้เป็นค่า null
        onDelete: "RESTRICT"
      }
    },
    { underscored: true }
  );

  Payment.associate = db => {
    Payment.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId"
      },
      onDelete: "RESTRICT"
    });

    Payment.belongsTo(db.ReservationPayment, {
      foreignKey: {
        name: "reservationPaymentId"
      },
      onDelete: "RESTRICT"
    });
  };

  return Payment;
};
