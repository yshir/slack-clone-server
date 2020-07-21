'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workspace_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Workspace',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 30],
      },
    },
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'channels',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Channel.associate = function (models) {
    Channel.belongsTo(models.Workspace, {
      as: 'workspace',
      foreignKey: 'workspace_id',
    });
    Channel.hasMany(models.Message, {
      as: 'messages',
      foreignKey: 'channel_id',
    });
    Channel.belongsToMany(models.User, {
      as: 'users',
      through: 'ChannelUser',
      foreignKey: 'channel_id'
    });
  };
  return Channel;
};
