module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      title: { type: DataTypes.STRING, allowNull: false }
    },
    { underscord: true }
  );

  return Province;
};
