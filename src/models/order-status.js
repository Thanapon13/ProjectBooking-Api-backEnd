module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define(
    "OrderStatus",
    {
      status: DataTypes.ENUM("WAITING", "CONFIRMED", "CANCEL"),
      date: DataTypes.DATE
    },
    { underscored: true }
  );

  OrderStatus.associate = db => {
    OrderStatus.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: true
      },
      onDelete: "RESTRICT"
    });
  };
  return OrderStatus;
};
