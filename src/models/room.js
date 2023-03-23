module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      price: DataTypes.DECIMAL(10, 2),
      address: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      type: DataTypes.ENUM("RESERVE", "SELLER")
    },

    { underscord: true }
  );

  return Room;
};
