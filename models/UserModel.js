const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserModel;
