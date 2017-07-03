"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      displayname: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  users.associate = function(models) {
    users.hasMany(models.messages, { as: "messages", foreignKey: "authorid" });
  };

  return users;
};
