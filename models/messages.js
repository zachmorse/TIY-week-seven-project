"use strict";
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define(
    "messages",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );

  messages.associate = function(models) {
    messages.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
    messages.hasMany(models.likes, { as: "likes", foreignKey: "messageid" });
  };
  return messages;
};
