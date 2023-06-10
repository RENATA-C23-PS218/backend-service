"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Scan.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Scan.belongsTo(models.Soil, {
        foreignKey: "soil_id",
        as: "soil",
      });
    }
  }
  Scan.init(
    {
      user_id: DataTypes.STRING,
      soil_id: DataTypes.STRING,
      soil_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Scan",
    }
  );
  return Scan;
};
