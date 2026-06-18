const { Sequelize } = require("sequelize")

let connection = undefined;

function initiateConnection() {
  if (!connection) {
    connection = new Sequelize('database', '', '', {
      dialect: 'sqlite',
      storage: '.data/database.sqlite',
      logging: false
    });
  }
  return connection
}

async function disconnectDB() {
  connection.close()
}

module.exports = {
  initiateConnection,
  disconnectDB,
}