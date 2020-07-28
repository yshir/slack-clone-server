'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      displayname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: beforeSave,
        beforeUpdate: beforeSave,
      },
    },
  )
  User.associate = function (models) {
    User.belongsToMany(models.Channel, {
      as: 'channels',
      through: 'ChannelUser',
      foreignKey: 'user_id',
    })
    User.belongsTo(models.Workspace, {
      as: 'workspace',
      foreignKey: 'workspace_id',
    })
    User.hasMany(models.ChannelUser, {
      as: 'channel_user',
      foreignKey: 'user_id',
    })
    User.hasMany(models.Message, {
      as: 'messages',
      foreignKey: 'user_id',
    })
  }
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}

const beforeSave = (user, options) => {
  if (user.password === undefined) return
  if (user.password === user.previous('password')) return

  return bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash
    })
    .catch(err => {
      throw err
    })
}
