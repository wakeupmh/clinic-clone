/* istanbul ignore file */
const fs = require('fs')
const path = require('path')
const { iclinicDb } = require('../../config')
const resolvedPath = path.resolve('src', 'prescription', 'models')
const Bluebird = require('bluebird')
const Sequelize = require('sequelize')

const readdir = Bluebird.promisify(fs.readdir)
let sequelize = null
let connected = false

if (!sequelize) {
  sequelize = new Sequelize(
    iclinicDb.database,
    iclinicDb.username,
    iclinicDb.password,
    {
      host: iclinicDb.host,
      port: iclinicDb.port,
      dialect: iclinicDb.dialect,
      logging: iclinicDb.logging,
      pool: iclinicDb.pool
    }
  )
}

const importModels = file => {
  const model = require(path.join(`${resolvedPath}/${file}`))(sequelize, Sequelize.DataTypes)
  db[model.name] = model

  return model
}

const db = {
  Sequelize,
  sequelize,
  bootstrap () {
    if (connected) {
      return Bluebird.resolve()
    }
    return readdir(`${resolvedPath}`)
      .map(data => importModels(data))
      .tap(() => {
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db)
          }
        })
      })
      .then(() => db.sequelize.authenticate())
      .tap(() => {
        connected = true
      })
  }
}

module.exports = db
