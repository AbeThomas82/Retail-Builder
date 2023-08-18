const { Model, DataTypes } = require('sequelize');//imports sequelize

const sequelize = require('../config/connection.js');//imports env values

class Tag extends Model {}//builds on Model info

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,//uses sequelize
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;//exports code
