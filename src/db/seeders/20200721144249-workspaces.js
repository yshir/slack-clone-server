'use strict'

const { workspaces } = require('../seed_data.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('workspaces', workspaces, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('workspaces', null, {});
  },
}
