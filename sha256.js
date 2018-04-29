var crypto = require('crypto');


var sha256 = function (message) {
    var c = crypto.createHash('sha256');
    var messageBuffer = new Buffer(message);
    c.update(messageBuffer);
    var bufferDigest = c.digest();
    var shaHex = bufferDigest.toString('hex');
    return shaHex;
};

module.exports = sha256;