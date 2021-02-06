const Sequelize = require('sequelize')
const crypto = require('crypto')
const setupDatabase = require('../repository/db')

const createSchema = sequelize => {
  return sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get () {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get () {
        return () => this.getDataValue('salt')
      }
    },
    currency: {
      type: Sequelize.ENUM('eur', 'usd', 'cop'),
      allowNull: false
    }
  })
}

const createHooks = User => {
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  User.prototype.correctPassword = function (enteredPassword) {
    const encryptPass = User.encryptPassword(enteredPassword, this.salt())
    return encryptPass === this.password()
  }

  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
}

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)
  const User = createSchema(sequelize)
  createHooks(User)

  return User
}
