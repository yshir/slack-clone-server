'use strict'
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define(
    'Workspace',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'workspaces',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
  Workspace.associate = function (models) {
    Workspace.hasMany(models.Channel, {
      as: 'channels',
      foreignKey: 'workspace_id',
    })
  }
  return Workspace
}
