//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('the object id created is', obj);

MongoClient.connect('mongodb://localhost:27017/RoutApp001', (err, db) => {

  if (err) {
    return console.log('Unable to connect MongoDB');
  }

  console.log('Conneted to MongoDB');


  var collection = db.collection('RoutApp001');


  collection.find().toArray().then( (docs) => {
    console.log(`RoutApp001 ${JSON.stringify(docs, undefined, 2)}`);

  }, (err) => {
    console.log('Unable to fetch the data', err);
  });


  var collectionOrderID001 = db.collection('OrderID001');
  collectionOrderID001.find({orderREF: '4713'}).toArray().then( (docs) => {
    console.log(`RoutApp001 search for 4713 ${JSON.stringify(docs, undefined, 2)}`);

  }, (err) => {
    console.log('Unable to fetch the data for 4713', err);
  });


  var collectionOrderID001 = db.collection('OrderID001');
  collectionOrderID001.updateOne({date: '02.01.2017'}, {$set:{sigFrom:'signature'}})
  .then( (result) => {
    console.log(`The record 02.01.2017 could be updated ${result}`);
    console.log(`-------------------------------`);
    console.log(`The record 02.01.2017 could be updated, upsertedId ${result.upsertedId}`);

  }, (err) => {
    console.log('Unable to fetch the data for 4712', err);
  });



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

/*

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

*/

   //db.close();

/*
   var user = {name: 'andrew', age: 25};
   var {name} = user;
   console.log('the name is', name);
*/
});
