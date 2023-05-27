"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.OTP, {
        foreignKey: "user_id",
        as: "otp",
      });

      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });

      User.hasOne(models.Profile, {
        foreignKey: "user_id",
        as: "profile",
      });

      User.hasMany(models.Scan, {
        foreignKey: "user_id",
        as: "scan",
      });
    }
  }
  User.init(
    {
      role_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      account_type: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      is_verifed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
