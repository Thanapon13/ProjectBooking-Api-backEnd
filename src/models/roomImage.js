module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define(
    "RoomImage",
    {
      roomImage: DataTypes.STRING,
      roomImage01: DataTypes.STRING,
      roomImage02: DataTypes.STRING,
      roomImage03: DataTypes.STRING,
      roomImage04: DataTypes.STRING,
      roomImage05: DataTypes.STRING,
      roomImage06: DataTypes.STRING
    },
    { underscord: true }
  );

  return RoomImage;
};
