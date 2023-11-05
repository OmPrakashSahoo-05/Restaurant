var mongoose = require("mongoose");
const tableSchema = require("./table").schema;
const reservationSchema = require("./reservation").schema;

var daySchema = new mongoose.Schema({
  date: Date,
  tables: [tableSchema]
});
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;