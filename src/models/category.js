module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      typeProduct: { type: DataTypes.STRING, allowNull: false }
    },
    { underscord: true }
  );

  Category.associate = db => {
    Category.hasMany(db.Room, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Category;
};
