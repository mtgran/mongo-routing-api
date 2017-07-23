const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose-ic');
const {userModel}  = require('./../server/models/user-model-ic');

// var id = '5974b14cf42cfc730022af82';
id = '265465464646464646465465ww4543';

if (!ObjectID.isValid(id)) {
  console.log('The objectID is not valid:', id);
}

//
// userModel.find({_id: id}).then((users) => {
//   console.log(users);
// }, (err) => {
//
// });
//
//
// userModel.findOne({_id: id}).then((user) => {
//   console.log(user);
// }, (err) => {
//
// });

id = '265465464646464646465465ww4543';
userModel.findById(id).then((user) => {
  if (!user) {
    return console.log('No user found in findById');
  }
  console.log(user);
// }, (err) => {
//   return console.log('error: No user found in findById');
//}).catch((err) => console.log(err));
}).catch((err) => console.log('catch error'));
