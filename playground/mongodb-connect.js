//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('the object id created is', obj);

MongoClient.connect('mongodb://localhost:27017/RoutApp001', (err, db) => {

  if (err) {
    return console.log('Unable to connect MongoDB');
  }

  console.log('Conneted to MongoDB');

/*
  db.collection('RoutApp001').insertOne({
    userid: 'testID',
    password: '1234567890',
    group: 'default'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert', err);
    } else {
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  });

  db.close();
*/

  db.collection('OrderID001').insertOne( {
    orderREF: '4711',
    fromUserID: 'mic9000',
    toUserID: 'e8000',
    date: '11.11.2017',
    sigFrom: 'asdfdsafsa',
    sigTo: 'eztdfghdfgf'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to add the document to the Order collection', err);
    } else {
      console.log(JSON.stringify(result.ops, undefined, 2));
      console.log(result.ops[0]._id.getTimestamp());
    }
  });

   db.close();


   var user = {name: 'andrew', age: 25};
   var {name} = user;
   console.log('the name is', name);

});
