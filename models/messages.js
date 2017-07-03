"use strict";
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define(
    "messages",
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );

  messages.associate = function(models) {
    messages.belongsTo(models.users, {
      as: "messages",
      foreignKey: "authorid"
    });
  };
  return messages;
};
