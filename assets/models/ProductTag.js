const { Model, DataTypes } = require('sequelize');//imports sequelize

const sequelize = require('../config/connection');//imports env

class ProductTag extends Model {}//builds on Model info

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,//data type
      allowNull: false,//no nulls
      primaryKey: true,//primary set for reference
      autoIncrement: true,//+1 add
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id"
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id"
      }
    },
  },
  {
    sequelize,//use sequelize
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;//exports code
