var {mongoose} = require('./../db/mongoose-ic').mongoose;


var routingModel = mongoose.model('routingModel', {

  //External reference
  extRef: { type: String }, //, required: true },

  //External reference 2
  extRef2: { type: String }, //, required: true },
  // Contract address
  contract: { type: String }, //, required: true },

  // Incoming BP
  incomingBP: { type: String }, //, required: true },

  // Incoming BP
  outgoingBP: { type: String }, //, required: true },

  // Terms of Sale
  termsOfSale: { type: String }, //, required: true },

  // Instruction
  Instruction: { type: String }, //, required: true },

  // Currency ISO
  waers: { type: String }, //, required: true },

  // Agreement
  agreement: { type: String }, //, required: true },

  // Contact details
  contactDetails: { type: String }, //, required: true },


  // signature: { type: String, required: true, minlength: 1, trim: true },
  state: { type: Boolean, default: false},
  timeStamp: { type: String, default: null }
  // email: { type: String, required: true, trim: true, minlength:3}
});


module.exports.routingModel = {routingModel};
