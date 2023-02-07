const { createPool } = require('mysql2/promise')

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'login',
  port: 3306
})

export { pool }
