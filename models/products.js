module.exports = function (sequelize, Sequelize) {
  var Product = sequelize.define("Product", {
    pid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    prod_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  }, { timestamps: false });
  return Product;
};