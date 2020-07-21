'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('messages', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        channel_id: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        user_id: {
          allowNull: true,
          type: Sequelize.UUID,
        },
        text: {
          allowNull: false,
          type: Sequelize.TEXT,
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
      await queryInterface.addConstraint('messages', {
        fields: ['channel_id'],
        type: 'foreign key',
        name: 'messages_channel_id_channels_fk',
        references: {
          table: 'channels',
          field: 'id',
        },
        onDelete: 'cascade',
      }),
      await queryInterface.addConstraint('messages', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'messages_user_id_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'SET NULL',
      }),
    ]
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('channels', 'messages_channel_id_channels_fk'),
      await queryInterface.removeConstraint('channels', 'messages_user_id_users_fk'),
      await queryInterface.dropTable('messages')
    ]
  }
};
