require("dotenv").config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const express = require("express");
const app = express();//express specific syntax for using express
const passport = require("passport");
const User = require("./model/User");
const mongoose = require("mongoose");
if (!process.env.MONGO_PASSWORD) {
    console.error("MONGO_PASSWORD environment variable is not set.");
    process.exit(1);
}
  
  // MongoDB connection string with URL encoding for the password
  const connectionString = `mongodb+srv://saytoshivam:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster0.hf21akx.mongodb.net/?retryWrites=true&w=majority`;
  
  // Use an options object to set useNewUrlParser and useUnifiedTopology
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  // Connect to MongoDB
  mongoose.connect(connectionString, options)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

    /*mongoose.connect(connectionString);
    const db = mongoose.connection;
    db.on("error",(err)=> console.log(err));
    db.once("open",()=>console.log("connected successfully"));*/

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req, res) => {
    res.send("hello yogita");
});

const port = 8000;
app.listen(port, () => {
    console.log("application is running on port : " + port);
});