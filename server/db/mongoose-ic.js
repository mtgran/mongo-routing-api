var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI
// || 'mongodb://heroku_dnrbjf4q:cgineh05e27r7udsfd2vbprb2h@ds119223.mlab.com:19223/heroku_dnrbjf4q'
 // || 'mongodb://localhost:27017/RoutinApp002');

mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://localhost:27017/RoutinApp002');



////////////////// mongoose.connect('mongodb://localhost:27017/RoutinApp002', { useMongoClient: true });



// Export the mongoose variable - database - collection

// module.exports.mongoose = {
//   mongoose: mongoose
// };
//
module.exports = { mongoose };

// process.env.NODE_ENV
