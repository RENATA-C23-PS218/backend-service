"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Soil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Soil.hasMany(models.Plant, {
        foreignKey: "soil_id",
        as: "plant",
      });

      Soil.hasMany(models.Scan, {
        foreignKey: "soil_id",
        as: "scan",
      });
    }
  }
  Soil.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Soil",
    }
  );
  return Soil;
};
