var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

router.get("/",(req,res)=>{
  res.send("welcome")
})

router.post("/", async (req, res, next) => {
  const dateTime = req.body.date;
  try {
    const days = await Day.find({ date:dateTime}).exec();

    if (days.length > 0) {
     
      const day = days[0];
      
      day.tables.forEach((table) => {
        
        if (table._id == req.body.table) {
         const user=req.user; 
         console.log(user.phone);
          table.reservation = new Reservation({
            name: user.fullname,
            phone: user.phone,
            email: user.email,
          });
          table.isAvailable = false;

           day.save(); 
          res.render("confirm",{
            user:user,
            bookingdate:dateTime,
            tablename:table.name,
          })
        }
      });
    } else {
      console.log("Day not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;