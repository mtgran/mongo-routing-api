//export const SERVER.STARTED_ON = 'Server started on port';

var icmsg = (message, param1, param2, param3, param4) => { //, params, language) => {
  if (param1 !== undefined) {
    console.log(message, param1);
  } else {
    console.log(message);
  }

};

module.exports = { // Object.freeze({
  MSG_SERVER_STARTED_ON: 'Server started on port',
  msg: icmsg
//});
};
