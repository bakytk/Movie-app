
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const config = require("./config");
const mongo_db = {};

mongo_db.mongoose = mongoose;
mongo_db.url = config.url;
mongo_db.movies = require("./models")(mongoose);

module.exports = mongo_db;
