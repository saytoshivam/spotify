require("dotenv").config();
const mongoose = require("mongoose");

function connectToMongo() {
  if (!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD) {
    console.error("MONGO_PASSWORD environment variable is not set.");
    process.exit(1);
  }

  // MongoDB connection string with URL encoding for the password
  const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster0.hf21akx.mongodb.net/?retryWrites=true&w=majority`;

  // Use an options object to set useNewUrlParser and useUnifiedTopology
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to MongoDB
  return mongoose.connect(connectionString, options);
}
/*mongoose.connect(connectionString);
    const db = mongoose.connection;
    db.on("error",(err)=> console.log(err));
    db.once("open",()=>console.log("connected successfully"));*/

module.exports = { connectToMongo };
