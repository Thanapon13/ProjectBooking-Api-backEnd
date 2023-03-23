module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: { type: DataTypes.STRING, allowNull: false }
    },
    { underscord: true }
  );

  return Category;
};
