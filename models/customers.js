module.exports = function(sequelize, Sequelize) {
  var Customer = sequelize.define("Customer", {
    cid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
    cust_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { timestamps: false });
  return Customer;
};