'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('channels', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        workspace_id: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        name: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      await queryInterface.addConstraint('channels', {
        fields: ['workspace_id'],
        type: 'foreign key',
        name: 'channels_workspace_id_workspaces_fk',
        references: {
          table: 'workspaces',
          field: 'id',
        },
        onDelete: 'cascade',
      }),
      await queryInterface.addIndex('channels', {
        fields: ['workspace_id', 'name'],
        name: 'channels_workspace_id_and_name_unique',
        unique: true,
      })
    ]
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeIndex('channels', 'channels_workspace_id_and_name_unique'),
      await queryInterface.removeConstraint('channels', 'channels_workspace_id_workspaces_fk'),
      await queryInterface.dropTable('channels'),
    ]
  }
};
