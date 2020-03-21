// ******************************************************************************************************
// customers.js [Customers Table Model]
// ******************************************************************************************************
'use strict';
module.exports = function(sequelize, Sequelize) {
  var Customer = sequelize.define("Customer", {
    cid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
    cust_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    cust_email: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  }, { timestamps: false });

  // Customer.associate = function (models) {
  //   models.Customer.hasMany(models.Order, {foreignKey:'cid'});
  // };
  return Customer;
};