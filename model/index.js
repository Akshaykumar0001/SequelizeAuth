const { Sequelize, DataTypes, Model } = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    port: "5000",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.log("not connected to the database:", error);
  });
const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;
db.userdetails = require("./user")(sequelize, DataTypes, Model);
db.tododetails = require("./Todo")(sequelize, DataTypes, Model);

sequelize.sync({ force: false});
module.exports = db;