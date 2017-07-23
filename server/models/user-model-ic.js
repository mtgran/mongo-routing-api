//var {mongoose} = require('./../db/mongoose-ic').mongoose;
//var mongoose = require('./../db/mongoose-ic').mongoose;
var {mongoose} = require('./../db/mongoose-ic');

var userModel = mongoose.model('userModel', {

  name: { type: String, required: true },
  signature: { type: String, required: true, minlength: 1, trim: true },
  active: { type: Boolean, default: false},
  timeStamp: { type: String, default: null },
  email: { type: String, required: true, trim: true, minlength:3}
});


//module.exports.userModel = {userModel};
module.exports = {userModel};
