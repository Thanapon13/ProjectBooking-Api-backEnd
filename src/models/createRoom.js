module.exports = (sequelize, DataTypes) => {
  const CreateRoom = sequelize.define(
    "CreateRoom",
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

  CreateRoom.associate = db => {
    CreateRoom.belongsTo(db.Province, {
      foreignKey: {
        name: "provinceId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    CreateRoom.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    CreateRoom.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return CreateRoom;
};
