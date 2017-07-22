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

*/

  var collectionOrderID001 = db.collection('OrderID001');
  collectionOrderID001.find({orderREF: '4712'}).count().then( (count) => {
    console.log(`Number of entries for 4712 ${count}`);

  }, (err) => {
    console.log('Unable to fetch the data for 4712', err);
  });

//  collectionOrderID001.deleteOne({orderREF: '4700'}, undefined)
  collectionOrderID001.deleteOne({date: '01.01.2017'}, undefined)
  .then((resultCollection) => {
    console.log('Entry orderREF 4700 found and deleted',
      JSON.stringify(resultCollection));
      console.log('Connection', resultCollection.connection);
      console.log('deletedCount', resultCollection.deletedCount);
      console.log('resultCollection', resultCollection);

  }, (error) => {
    console.log('Entry orderREF 4700 could not be deleted');

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
