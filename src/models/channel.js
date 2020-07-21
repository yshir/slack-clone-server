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
    // associations can be defined here
  };
  return Channel;
};
