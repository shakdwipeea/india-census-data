/*========================================
=            Token generation            =
========================================*/
/**
*
* Module to generate unique ids (uuid) for couchdb
*
**/



/*-----  End of Token generation  ------*/



module.exports = function (id, mode, number) {
  
  var crypto = require('crypto');
  
  if(mode)
  {
    id = id.toString();

    id = crypto.randomBytes(16).toString('hex');

    var otp = id.slice(0,number);

    return otp;
  } 
}
