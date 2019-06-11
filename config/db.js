const mongoose = require("mongoose");
const keys = require("./keys");
const db = keys.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //Exit process with a failure
    process.exit(1);
  }
};

module.exports = connectDB;
