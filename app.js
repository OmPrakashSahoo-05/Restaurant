require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const PORT=process.env.PORT || 8010;

const userRoute=require("./routes/user")
const { checkForAuthenticationCookie } = require("./middleware/authentication");
// MongoDB
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Express
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine","ejs");
app.use(express.static("public"));
app.set("views",path.resolve("./views"));
app.use(checkForAuthenticationCookie("token"));
// Routes

app.get("/",(req,res)=>{
  res.render("home",{
    user:req.user,
  });
})
app.use("/availiability", require("./routes/availability"));
app.use("/reserve", require("./routes/reservation"));
app.use("/user",userRoute);


app.listen(PORT,()=>console.log("server started"));