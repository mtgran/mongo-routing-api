///////////////////////////////////////////////////////
// We can run the test suite with 'npm run test-watch'
///////////////////////////////////////////////////////

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
//const user = require('./../models/rout-model-ic').userModel;
const {routing} = require('./../models/rout-model-ic');
const {userModel} = require('./../models/user-model-ic');


beforeEach((done) => {
  //console.log(user);

  console.log('user object:', JSON.stringify(userModel, undefined, 2));
  userModel.deleteMany({email: 'Supertest@gmail.com'})
    .then((res) => {
     console.log('Number of records deleted in userModel():', res.result.n);
      // return done('Number of records deleted in userModel():', res.result.n);


      var userExample1_for_read_test = ({
          name: 'Arnold Schwarzenegger - userExample1_for_read_test A1',
          signature: Date.now(),
          email: 'test_to_read@gmail.com',
          active: false
      });
      var userExample2_for_read_test = ({
          name: 'Arnold Schwarzenegger - userExample2_for_read_test A2',
          signature: Date.now(),
          email: 'test_to_read@gmail.com',
          active: false
      });
      var user_for_read_test = [userExample1_for_read_test, userExample2_for_read_test];
      userModel.insertMany(user_for_read_test)
        .then(() => done());

//      done();
    }, (err) => {
      done(err);
    })
//done();
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

    // console.log(' json start:');
    // console.log(JSON.stringify(userExample, undefined, 2));
    // console.log(' json end:');

    // make a request with Supertest
    request(app)
      .post('/user')
      //      .send({userExample})
      .send(JSON.stringify(userExample, undefined, 2))
      //.set('Accept', 'application/json')
      .type('json')
      //.expect(200)
      .expect( (response) => {
        //assert(response.body.name === 'xdx').toBe(true);
// console.log('aaaaaaaaaaaaaaaaaaaaaaa:'); ///, response);
        // Custom assertion
        // expect("456" === 'xdx').toBe(true);
        // expect(response.body.name).to.have.string('1d3');
        expect(response.body.name).toEqual(userExample.name, '0.- The response.body.name is not equal to userExample.name');
        // console.log('\n//////----///////////////:', response.body.name);
        // expect(response.body.name).to.have.string('1d3');
        //expect("456" === 'xdx').toBe(true);
      //  done();
      })
      .end( (err, res) => { // end to rap the things done
        // now we want to check what is stored in the mondodb user collection

//console.log('bbbbbbbbbbbbbb:'); //, JSON.stringify(res, undefined, 2));

        if (err) {
//          console.log('cccccccc:'); //, JSON.stringify(res, undefined, 2));
          return done(err);
        }
        // console.log('dddddddddddd:', userExample.email); //, JSON.stringify(res, undefined, 2));
        // console.log('dddddd----ddd:', userModel); //, JSON.stringify(res, undefined, 2));
        userModel.find({signature: userExample.signature})
          .then((user) => {
            // console.log('findfindfindfindfind:', user); //, JSON.stringify(res, undefined, 2));

            // ///////////////////////////////////////////////////////
            // // leave start
            // console.log('user.signature:', user[0].signature); //, JSON.stringify(res, undefined, 2));
            // console.log('user.signature typeof:', typeof(user)); //, JSON.stringify(res, undefined, 2));
            // console.log('user.signature typeof [0]:', typeof(user[0])); //, JSON.stringify(res, undefined, 2));
            // console.log('userExample.signature:', userExample.signature); //, JSON.stringify(res, undefined, 2));
            // console.log('user[0].name:', user[0].name); //, JSON.stringify(res, undefined, 2));
            // console.log('userExample[0].name:', userExample.name); //, JSON.stringify(res, undefined, 2));
            // // leave start
            // ///////////////////////////////////////////////////////

            expect(user[0].signature).toEqual(userExample.signature, '1.- user[0].signature is not equal to userExample.signature');
            // expect(user[0].signature).toEqual('2', '--To equal.- user[0].signature is not equal to userExample.signature');
            // expect(user[0].signature).toMatch('2', '--To match.- user[0].signature is not equal to userExample.signature');
            // expect(0).toBe(1, '0.- user[0].signature is not equal to userExample.signature');
            // expect(user[0].signature).toBe(userExample.signature, '1.- user[0].signature is not equal to userExample.signature');
            // expect(user[0].signature === userExample.signature).toBe(true);
            // expect(user[0].name === userExample.name).toBe(true);
            //expect(user).toBe(userExample);
            //expect('123').toBe('4567');
            // console.log('eeeeee:'); //, JSON.stringify(res, undefined, 2));
            done();
          }, (err) => {
            // console.log('fffffffffff:'); //, JSON.stringify(res, undefined, 2));
            return done(err);
          }). catch((e) => {
            // console.log('ggggggggggg:'); //, JSON.stringify(res, undefined, 2));
            return done(e);
          })


      });

    //     console.log('\n//////finishing///////////////:');
    // return done();
  });


  it ('it should read all users', (done) => {
    request(app)
      .get('/user')
    //  .status(200)
      .expect((response) => {
        expect(response.length).toNotBe(0);
      //  console.log('Number of documents selected from User:', response);
        //console.log('documents:', response.body);

      }, (err) => {

      }).end((err, response) => {
        if (err) {
          return done(err);
        }
        expect(response.length).toNotBe(0);
        done();

      });
      //      .send({userExample})

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
