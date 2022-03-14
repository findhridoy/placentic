// External Imports
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Internal Imports
const { PORT, MDB_URI } = require("./index");

// Connecting with Database
const connectMDB = async () => {
  try {
    await connect(MDB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({
      message: "Successfully connected with the Database",
      badge: true,
    });
  } catch (err) {
    error({
      message: `Unable to connect with the Database \n${err}`,
      badge: true,
    });
  }
};

module.exports = connectMDB;
