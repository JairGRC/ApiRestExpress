const { Sequelize , DataTypes} = require('Sequelize')


const { config } = require('../configsss/configss')
//const setupModels =require('./../db/models')



const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI,{
  dialect: 'mysql',
  logging: console.log,
})



//setupModels(sequelize,DataTypes)


// no se recomienda sincronizar en produccion, por ello se utiliza migraciones
//sequelize.sync()

module.exports = sequelize
