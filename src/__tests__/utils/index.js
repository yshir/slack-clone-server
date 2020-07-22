const models = require('../../models')

module.exports = {
  createWorkspace: async (params = {}) => {
    await models.Workspace.create({
      name: params.name || `NAME_${Date.now()}`,
    })
  },
  truncateWorkspace: async () => {
    await models.Workspace.destroy({ truncate: { cascade: true } })
  },
}
