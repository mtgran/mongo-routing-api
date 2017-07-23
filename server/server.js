
var {mongoose} = require('./db/mongoose-ic').mongoose;










////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// var mongoose = require('mongoose');
//
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/RoutinApp002');

// dd
// create a model

// var {mongoose} = require('./db/mongoose-ic').mongoose;

// var routingModel = mongoose.model('UserTab', {
//
//   name: { type: String, required: true },
//   signature: { type: String, required: true, minlength: 1, trim: true },
//   active: { type: Boolean, default: false},
//   timeStamp: { type: String, default: null },
//   email: { type: String, required: true, trim: true, minlength:3}
// });

//
// var newRoutingModel = new routingModel({
//
//   name: 'Arnold Schwarzenegger',
//   signature: 'jfdsoijd09dik',
//   email: 'arnold@gmail.com'
// //  timeStamp: '01.01.2017'
//
// });
//
// newRoutingModel.save().then( (doc) => {
//   console.log('Saved:\n', JSON.stringify(doc, undefined, 2));
// //  console.log('-----------', doc);
// //  console.log('Saved:', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save the model newRoutingModel', e);
// });
