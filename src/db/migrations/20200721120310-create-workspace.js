'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workspaces', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workspaces')
  },
}
