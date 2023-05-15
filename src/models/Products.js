const Sequelize = require("sequelize");
const db = require("./db");

const Products = db.define("products", {
  code: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  cost_price: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
  },
  sales_price: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
  },
});

Products.sync();

module.exports = Products;
