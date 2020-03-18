module.exports = function (sequelize, Sequelize) {
  var OrderItem = sequelize.define("OrderItem", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    oid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    item_no: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  return OrderItem;
};