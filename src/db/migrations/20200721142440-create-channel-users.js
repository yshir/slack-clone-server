'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('channel_users', {
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
          allowNull: false,
          type: Sequelize.UUID,
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
      await queryInterface.addConstraint('channel_users', {
        fields: ['channel_id'],
        type: 'foreign key',
        name: 'channel_users_channel_id_channels_fk',
        references: {
          table: 'channels',
          field: 'id',
        },
        onDelete: 'cascade',
      }),
      await queryInterface.addConstraint('channel_users', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'channel_users_user_id_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
      }),
    ]
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('channel_users', 'channel_users_channel_id_channels_fk'),
      await queryInterface.removeConstraint('channel_users', 'channel_users_user_id_users_fk'),
      await queryInterface.dropTable('channel_users'),
    ]
  }
};
