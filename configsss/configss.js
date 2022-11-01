require ('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USer,
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbName:process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret:process.env.JWT_SECRET
}

module.exports = {config}
