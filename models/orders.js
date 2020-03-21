// ******************************************************************************************************
// orders.js [Orders Table Model]
// ******************************************************************************************************
"use strict";
module.exports = function (sequelize, Sequelize) {
  var Order = sequelize.define("Order", {
    oid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cid: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    order_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    ordered: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  }, { timestamps: false });

  Order.associate = function (db) {
    db.Order.hasMany(db.OrderItem, {foreignKey:'oid'});
  };
  return Order;
};