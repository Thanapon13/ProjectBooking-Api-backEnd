module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      ProvinceLogoImage: DataTypes.STRING
    },
    { underscord: true }
  );

  Province.associate = db => {
    Province.hasMany(db.Room, {
      foreignKey: {
        name: "provinceId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Province.hasMany(db.CreateRoom, {
      foreignKey: {
        name: "provinceId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Province;
};
