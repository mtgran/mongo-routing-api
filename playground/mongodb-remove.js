const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose-ic');
const {userModel}  = require('./../server/models/user-model-ic');


//
//userModel.findOneAndRemove({});
userModel.findByIdAndRemove('597454cfd6834b2e08014b4e')
  .then((doc) => {
    console.log('\n Document removed', doc);
  }, (err) => {

  });
