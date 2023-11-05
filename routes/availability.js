var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
router.get("/",(req,res)=>{
  res.render("date");
})

router.post("/", async (req, res, next) => {
  console.log("Request attempted");
  console.log(req.body);

  const dateTime = req.body.date + ' ' + req.body.time;

  try {
    const docs = await Day.find({ date: dateTime });

    if (docs.length > 0) {
      console.log("Record exists. Sent docs.");
      res.render("table", {
        docs: docs[0],
      });
    } else {
      const allTables = require("../data/allTables");
      const day = new Day({
        date: dateTime,
        tables: allTables,
      });
      await day.save();
      console.log("Created new datetime. Here are the default docs");
      const newDocs = await Day.find({ date: dateTime });
      
      res.render("table", {
        docs: newDocs[0],
        user:req.user,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred.");
  }
});


module.exports = router;