var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var reservationSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  userid:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});
var Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;