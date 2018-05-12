const util = require('../src/common/js/util')

const serverConfig = {
  ip: util.getLocalIP(),
  port: 8888
}

module.exports = {
  serverConfig
}