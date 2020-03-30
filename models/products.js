// ******************************************************************************************************
// products.js [Products Table Model]
// ******************************************************************************************************
'use strict';
module.exports = function (sequelize, Sequelize) {
  var Product = sequelize.define("Product", {
    pid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    prod_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    check_pop: {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue : 0
    },
    type: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    temp: {
      type: Sequelize.STRING(5),
      allowNull: false
    },
    size: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    check_hot: {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue : 0
    }
  }, { timestamps: false });
  return Product;
};