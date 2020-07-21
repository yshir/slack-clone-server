'use strict'

const { channels } = require('./seed_data.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', channels, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', null, {});
  },
}
