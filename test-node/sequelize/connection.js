const {Sequelize } = require("sequelize")

let db = undefined;

function connectDB(){
  if(!db){
    db = new Sequelize('database', '', '', {
      dialect: 'sqlite',
      storage: '.data/database.sqlite',
      logging: false
    });
  }
  return db
}

async function disconnectDB(){
  db.close()
}

async function createTables(){
  db.sync({
      force: true
  })
}
 
module.exports = {
  connectDB,
  disconnectDB,
  createTables
}