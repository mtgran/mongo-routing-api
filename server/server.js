const config = require('./../config/config.js');


///////////////////////////////////////////////////////////////////////
// Express Server
///////////////////////////////////////////////////////////////////////

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var outmsg = require('./messages/server-msg.js');

const {ObjectID} = require('mongodb');
///////////////////////////////////////////////////////////////////////
// Collection and Documents needed
///////////////////////////////////////////////////////////////////////
var {mongoose} = require('./db/mongoose-ic').mongoose;
var {routingModel} = require('./models/rout-model-ic').routingModel;
//var {userModel} = require('./models/user-model-ic').userModel;
var {userModel} = require('./models/user-model-ic');

const port = process.env.PORT || 3000;

///////////////////////////////////////////////////////////////////////
// Server
///////////////////////////////////////////////////////////////////////
var app = express();

// We have to use bodyParser to get the JSON and convert it into an object
app.use(bodyParser.json());

///////////////////////////////////////////////////////////////////////
// 'POST /user' -> Create an User
///////////////////////////////////////////////////////////////////////
app.post('/user', (request, response) => {
// We have to use bodyParser to get the JSON and convert it into an object

// outmsg.msg('---body---\n');
//   outmsg.msg(request.body);
  // outmsg.msg('---request---\n');
  // outmsg.msg(request);

  var user = new userModel({
    name: request.body.name,
    signature: request.body.signature,
    email: request.body.email,
    timeStamp: Date.now(),
    active: false
  });

  user.save().then( (doc) => {
    console.log('**Saved the userModel**:\n', JSON.stringify(doc, undefined, 2));
    response.status(200).send(doc);

  }, (e) => {
    console.log('**Unable to save the model userModel**\n', e);
    response.status(400).send(e);
  });


  ////////////////////////////////////////////////////////
  // JSON Example
  ////////////////////////////////////////////////////////
  // {
  //     "__v": 0,
  //     "name": "Arnold Schwarzenegger Version 4",
  //     "signature": "Signature 4",
  //     "email": "4@gmail.com",
  //     "_id": "59745822ba5c8c12b488df7c",
  //     "timeStamp": null,
  //     "active": false
  // }

});


///////////////////////////////////////////////////////////////////////
// 'POST /user' -> Create an User
///////////////////////////////////////////////////////////////////////
app.get('/user', (request, response) => {
// We have to use bodyParser to get the JSON and convert it into an object

//userModel.find({signature: userExample.signature})
userModel.find()
  .then((users) => {

  // var user = new userModel({
  //   name: request.body.name,
  //   signature: request.body.signature,
  //   email: request.body.email,
  //   active: false
  // });

  // user.get()().then( (doc) => {
  //   console.log('**Saved the userModel**:\n', JSON.stringify(doc, undefined, 2));
  //   response.status(200).send(doc);

  response
    .status(200)
    .send({users});

  }, (e) => {
    console.log('**Unable to select any document from userModel**\n', e);
    response.status(400).send(e);
  });


});

////////////////////////////////////////////////
// UPDATE
////////////////////////////////////////////////
app.patch('/user/:id', (request, response) => {

  var id = request.params.id;
  var body = _.pick(request.body, ['name', 'email', 'signature']);

  // Validate ID
  if (!ObjectID.isValid(request.params.id)) {
    console.log('The objectID is not valid:', request.params.id);
    return response.status(404).send();
  }

  body.email = '1234@hotmail.com';
  body.timeStamp = '_xxxx_';

  userModel.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((user) => {
      if (!user) {
        return response.status(404).send();
      }
//    I6 Sintax
      response.status(200).send({user});
    }, (err) => {

    }).catch((err) => {
        response
          .status(400)
          .send();
    })

});



///////////////////////////////////////////////////////////////////////
// 'POST /user' -> Create an User
///////////////////////////////////////////////////////////////////////
app.get('/user/:id', (request, response) => {
// We have to use bodyParser to get the JSON and convert it into an object

// Validate ID
if (!ObjectID.isValid(request.params.id)) {
  console.log('The objectID is not valid:', request.params.id);
  return response.status(404).send();
}

//userModel.find({signature: userExample.signature})
userModel.findById(request.params.id)
  .then((user) => {
    if (!user) {
    // return console.log('The objectID is not valid:', request.params.id);
    response
      .status(404)
      .send();
      // .send({user});

    }

  response
    .status(200)
    .send({user});

  }, (e) => {
    console.log('**Unable to select any document from userModel**\n', e);
    response.status(404).send(e);
  });


});



app.delete('/user/:id', (request, response) => {

  // Validate ID
  if (!ObjectID.isValid(request.params.id)) {
    console.log('The objectID is not valid:', request.params.id);
    return response.status(404).send();
  }

  userModel.findByIdAndRemove(request.params.id)
    .then((user) => {
      console.log('\nUser removed', user);
      response
        .status(200)
        .send({user});

    }, (err) => {
      response
        .status(404)
        .send({});

    });

});



///////////////////////////////////////////////////////////////////////
// 'POST /routing' -> Create a routing
///////////////////////////////////////////////////////////////////////
app.post('/routing', (request, response) => {

  outmsg.msg('---body---\n');
    outmsg.msg(request.body);

  // var routingDocument = new routingModel({
  //   extRef: 'request.body.extRef',
  //   extRef2: 'request.body.extRef2',
  //   contract: 'request.body.contract',
  //   incomingBP: 'request.body.incomingBP',
  //   outgoingBP: 'request.body.outgoingBP',
  //   termsOfSale: 'request.body.termsOfSale',
  //   Instruction: 'request.body.Instruction',
  //   waers: 'request.body.waers',
  //   agreement: 'request.body.agreement',
  //   contactDetails:  'request.body.contactDetails',
  //   signature: 'request.body.signature',
  //   state: 'request.body.state',
  //   timeStamp: 'request.body.timeStamp'
  // });

  var routingDocument = {
    extRef: request.body.extRef,
    extRef2: request.body.extRef2,
    contract: request.body.contract,
    incomingBP: request.body.incomingBP,
    outgoingBP: request.body.outgoingBP,
    termsOfSale: request.body.termsOfSale,
    Instruction: request.body.Instruction,
    waers: request.body.waers,
    agreement: request.body.agreement,
    contactDetails:  request.body.contactDetails,
    signature: request.body.signature,
    state: request.body.state,
    timeStamp: request.body.timeStamp
  };

  routingDocument.save().then((doc) => {
    console.log('Saved:\n', JSON.stringify(doc, undefined, 2));
    response.send(doc);

  }, (e) => {
    console.log('Unable to save the model routingModel', e);
    response.status(400).send(e);
  });

  ////////////////////////////////////////////////////////
  // JSON Example
  ////////////////////////////////////////////////////////
  // {
  //     "__v": 0,
  //     "extRef": "DE45000001",
  //     "extRef2": "2017073000_001",
  //     "contract": "0x4711",
  //     "incomingBP": "30040",
  //     "outgoingBP": "30041",
  //     "termsOfSale": "smart ExW",
  //     "Instruction": "Instruction 4711",
  //     "waers": "BTC",
  //     "agreement": "xy",
  //     "contactDetails": "zz",
  //     "signature": "xzqf34rfsdfggv4tz54",
  //     "_id": "59745c9872822e1536e27372",
  //     "timeStamp": "01.01.2017",
  //     "state": true
  // }



});

///////////////////////////////////////////////////////////////////////
// Server listening on port 3000
///////////////////////////////////////////////////////////////////////
app.listen(port ,() => {
  outmsg.msg(outmsg.MSG_SERVER_STARTED_ON, port);

});

///////////////////////////////////////////////////////////////////////
// Export the app for testing porpouses
///////////////////////////////////////////////////////////////////////

module.exports = {app};

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////





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

// dd.stringify(us
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
