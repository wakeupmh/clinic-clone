module.exports = Object.freeze({
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: 5432,
  logging: false
})
