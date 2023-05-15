const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão com banco de dados realizada com sucesso!");
  })
  .catch(function () {
    console.log("Erro:conexão com banco de dados não realizada com sucesso!");
  });

module.exports = sequelize;
