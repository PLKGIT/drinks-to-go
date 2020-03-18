// ******************************************************************************************************
// customers.js [Customers Table Model]
// ******************************************************************************************************

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
  return Customer;
};