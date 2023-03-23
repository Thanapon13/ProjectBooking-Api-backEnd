const {
  ORDERSTATUS_WAITING,
  ORDERSTATUS_CONFIRMED,
  ORDERSTATUS_CANCEL
} = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define(
    "OrderStatus",
    {
      status: {
        type: DataTypes.ENUM(
          ORDERSTATUS_WAITING,
          ORDERSTATUS_CONFIRMED,
          ORDERSTATUS_CANCEL
        ),
        allowNull: false,
        defaultValue: ORDERSTATUS_WAITING
      },
      date: DataTypes.DATE
    },
    { underscored: true }
  );

  return OrderStatus;
};
