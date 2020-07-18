const mongoose = require("mongoose");

const options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(`${process.env.MONGODB_URI}`, options, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("++++++++++++ Connection BDD OK ++++++++++++");
  }
});

module.exports = mongoose;
