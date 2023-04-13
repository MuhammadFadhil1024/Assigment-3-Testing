'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username can't be empty!"
        },
        notNull: false
    }
    },
    email: {
      type : DataTypes.STRING,
      unique: {
        args : true,
        msg : "Email must be unique!"
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};