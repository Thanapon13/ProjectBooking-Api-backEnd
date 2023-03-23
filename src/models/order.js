module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,

        validate: {
          notEmty: true
        },
        onDelete: "RESTRICT"
      }
    },
    {
      underscord: true
    }
  );

  return Order;
};
