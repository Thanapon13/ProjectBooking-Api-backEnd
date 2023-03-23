module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscord: true }
  );

  Cart.associate = db => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Cart.belongsTo(db.Room, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Cart;
};
