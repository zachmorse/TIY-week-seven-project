"use strict";
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define(
    "likes",
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      messagesid: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );

  likes.associate = function(models) {
    likes.belongsTo(models.user, { as: "authorId", foreignKey: "userid" });
    likes.belongsTo(models.messages, {
      as: "message",
      foreignKey: "messagesid"
    });
  };
  return likes;
};
