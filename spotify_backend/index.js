const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const express = require("express");
const app = express();//express specific syntax for using express
const passport = require("passport");
const User = require("./model/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const { connectToMongo } = require('./extensions/dbExtention');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
const PORT = 8000;
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

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
//app.use(express.json());
app.use(bodyParser.json())

app.use(cors());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile),(req, res) => {
  res.setHeader('Content-Type', 'application/json');
});

app.use("/auth",authRoutes);

app.use("/song",songRoutes);

app.use("/playlist",playlistRoutes);