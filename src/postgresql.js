const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.INTERNAL_DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    keepAlive: true,
    // ssl: {
    //   require: false,
    //   rejectUnauthorized: false,
    // },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000, // Wait up to 90 seconds for a connection
    idle: 10000, // Keep connections open for 10 seconds after inactivity
  },
  logging: console.log, // Enable logging for debugging
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log("intenral url", process.env.INTERNAL_DATABASE_URL);
    console.log(process.env.NODE_ENV);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
