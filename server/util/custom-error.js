'use strict';

module.exports = function CustomError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
  this.http_status_code = extra;
};

require('util').inherits(module.exports, Error);
