require('dotenv').config()

module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: '3306',
    database: `user_authentications`,
    user: 'root',
    password: 'admin',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
