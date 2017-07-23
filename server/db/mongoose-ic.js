var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RoutinApp002');

// Export the mongoose variable - database - collection

module.exports.mongoose = {
  mongoose: mongoose
};
