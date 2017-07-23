///////////////////////////////////////////////////////
// We can run the test suite with 'npm run test-watch'
///////////////////////////////////////////////////////

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
//const user = require('./../models/rout-model-ic').userModel;
const {userModel} = require('./../models/rout-model-ic');
const {routing} = require('./../models/user-model-ic');


beforeEach((done) => {
  //console.log(user);

  console.log('user object:', JSON.stringify(userModel, undefined, 2));
//   userModel.deleteMany({email: 'Supertest@gmail.com'})
//     .then((res) => {
// //      console.log('Number of records deleted in userModel():', res.result.n);
//       return done('Number of records deleted in userModel():', res.result.n);
//
//     }, (err) => {
//       done(err);
//     })
done();
});

//////////////////////////////////////////////////////////////
// Test section for POST /user
//////////////////////////////////////////////////////////////
describe('POST /user', () => {

  //***********************************************
  //***********************************************
  // Creation of a new user
  //***********************************************
  //***********************************************
  it ('it should create a new user', (done) => {
    // This is an asynchronous test, therefore we have to specify 'done',
    // otherwise is not gonna end

    // var userExample = new userModel ({
    //     name: 'Arnold Schwarzenegger - Supertest',
    //     signature: Date.now(),
    //     email: 'Supertest@gmail.com',
    //     active: false
    // });

    var userExample = ({
        name: 'Arnold Schwarzenegger - Supertest',
        signature: Date.now(),
        email: 'Supertest@gmail.com',
        active: false
    });

    console.log(' json start:');
    console.log(JSON.stringify(userExample, undefined, 2));
    console.log(' json end:');

    // make a request with Supertest
    request(app)
      .post('/user')
//      .send({userExample})
 .send(JSON.stringify(userExample, undefined, 2))
//.send({'param1': 'uno', 'param2': 'dos'})
      //.set('Accept', 'application/json')
      .type('json')
      .expect(200)
      .expect( (response) => {
        // Custom assertion
        expect(response.body.name).toBe(userExample.name); })
      .end( (err, res) => { // end to rap the things done
        // now we want to check what is stored in the mondodb user collection

        if (err) { 
          return done(err);
        }
        userModel.find({signature: userExample.signature})
          .then((user) => {
            expect(userModel.signature).toBe(userExample.signature);
            expect(userModel.name).toBe(userExample.name);
            expect(user).toBe(userExample);
            done();
          }, (err) => {
            return done(err);
          }). catch((e) => {
            return done(e);
          })


      });


    done();
  });




  // //***********************************************
  // //***********************************************
  // // It test the failure of creating a new user
  // //***********************************************
  // //***********************************************
  // it ('it should not create a new user with invalid data', (done) => {
  //   // This is an asynchronous test, therefore we have to specify 'done',
  //   // otherwise is not gonna end
  //
  //
  //   // make a request with Supertest
  //   request(app)
  //     .post('/user')
  //     .send({})   // ===> We pass no value in order to produce failure
  //     .expect(400)
  //     // .expect( (response) => {
  //     //   // Custom assertion
  //     //   expect(response.body.name).toBe(userExample.name); })
  //     .end( (err, res) => { // end to rap the things done
  //       // now we want to check what is stored in the mondodb user collection
  //       if (err) {
  //         return done(err);
  //       }
  //       userModel.find({signature: userExample.signature})
  //         .then((users) => {
  //           expect(users.length).toBe(0);
  //
  //           // expect(userModel.signature).toBe(userExample.signature);
  //           // expect(userModel.name).toBe(userExample.name);
  //           // expect(user).toBe(userExample);
  //           done();
  //         }, (err) => {
  //           return done(err);
  //         }). catch((e) => {
  //           return done(e);
  //         })
  //     });
  //
  //
  //   done();
  // });


});




//////////////////////////////////////////////////////////////
// Test section for POST /routing
//////////////////////////////////////////////////////////////
describe('POST /routing', () => {



});
