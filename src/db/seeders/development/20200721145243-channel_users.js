'use strict'

const { channel_users } = require('./seed_data.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channel_users', channel_users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channel_users', null, {});
  },
}
