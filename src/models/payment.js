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
  };

  return Payment;
};
