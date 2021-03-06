'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        workspace_id: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        displayname: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        avatar_url: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.addConstraint('users', {
        fields: ['workspace_id'],
        type: 'foreign key',
        name: 'users_workspace_id_workspaces_fk',
        references: {
          table: 'workspaces',
          field: 'id',
        },
        onDelete: 'cascade',
      }),
      await queryInterface.addIndex('users', {
        fields: ['workspace_id', 'username'],
        name: 'users_workspace_id_and_username_unique',
        unique: true,
      })
    ]
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeIndex('users', 'users_workspace_id_and_username_unique'),
      await queryInterface.removeConstraint('users', 'users_workspace_id_workspaces_fk'),
      await queryInterface.dropTable('users'),
    ]
  },
}
