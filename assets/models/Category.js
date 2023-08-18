const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,//data type
      allowNull: false,//no null values
      primaryKey: true,//primary
      autoIncrement: true//auto value +1
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,//use sequelize
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;//exports code
