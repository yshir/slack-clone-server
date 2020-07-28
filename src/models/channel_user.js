'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChannelUser = sequelize.define(
    'ChannelUser',
    {
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
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'channel_users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
  ChannelUser.associate = function (models) {
    ChannelUser.belongsTo(models.Channel, {
      as: 'channel',
      foreignKey: 'channel_id',
    })
    ChannelUser.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    })
  }
  return ChannelUser
}
