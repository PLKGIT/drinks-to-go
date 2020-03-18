module.exports = function (sequelize, Sequelize) {
  var Order = sequelize.define("Order", {
    oid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ordered: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, { timestamps: false });
  return Order;
};