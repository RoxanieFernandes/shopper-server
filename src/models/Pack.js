const Sequelize = require("sequelize");
const db = require("./db");

const Packs = db.define("packs", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  pack_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: "products",
      key: "code",
    },
  },
  product_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: "products",
      key: "code",
    },
  },
  qty: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

Packs.sync();

module.exports = Packs;