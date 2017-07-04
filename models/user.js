"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      displayname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  user.associate = function(models) {
    user.hasMany(models.messages, { as: "messages", foreignKey: "authorid" });
    user.hasMany(models.likes, { as: "likes", foreignKey: "userid" });
  };

  return user;
};
