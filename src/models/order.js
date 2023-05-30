module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,

        validate: {
          notEmpty: true
        },
        onDelete: "RESTRICT"
      }
    },
    {
      underscord: true
    }
  );

  Order.associate = db => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Order.belongsTo(db.Room, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Order.hasMany(db.OrderStatus, {
      foreignKey: {
        name: "orderId",
        allowNull: true
      },
      onDelete: "RESTRICT"
    });

    Order.hasOne(db.Payment, {
      foreignKey: {
        name: "orderId",
        allowNull: true
      },
      onDelete: "RESTRICT"
    });
  };

  return Order;
};
