module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      price: DataTypes.DECIMAL(10, 2),
      address: { type: DataTypes.STRING, allowNull: false },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      roomImage: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { underscored: true }
  );

  Room.associate = db => {
    Room.hasMany(db.Order, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.hasMany(db.Reservation, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.hasMany(db.Cart, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.hasMany(db.ReservationPayment, {
      foreignKey: {
        name: "roomId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.belongsTo(db.Province, {
      foreignKey: {
        name: "provinceId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Room.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Room;
};
