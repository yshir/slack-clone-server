'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    channel_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Channel',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.text,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Message.associate = function (models) {
    Message.belongsTo(models.Channel, {
      as: 'channel',
      foreignKey: 'channel_id',
    });
    Message.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };
  return Message;
};
