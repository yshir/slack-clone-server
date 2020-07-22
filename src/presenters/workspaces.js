const _ = require('lodash')

const _serialize = item => {
  return {
    name: item.name,
  }
}

module.exports = data => {
  if (_.isArray(data)) {
    return data.map(item => _serialize(item))
  }
  return _serialize(data)
}
