const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  uname: String,
  email: String,
  city: String,
  password: String
});

const DuserModel = mongoose.model("Duser", UserSchema);
module.exports = DuserModel;