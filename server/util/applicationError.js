'use strict';
const applicationErrors = require("./errors")
const httpStatus = require('../http_status')
const util = require('util')
const constants = require('../constants')
const config = require('../../config/config')

class ErrorContext {
  constructor(className, method, details) {
    this.application = constants.application.name;
    this.class_name = className,
      this.method = method,
      this.details = details
  }
}

class ApplicationError extends Error {
  constructor(error, errorContext) {
    super(error && !error.message ? error.message : error)

    Error.captureStackTrace(this, this.constructor)

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    this.http_status_code = 500
    this.error_code = 0
    this.message = httpStatus.STATUS_CODES[500]
    this.error_context = errorContext ? errorContext : null;

    if (error && error.message) {
      this.message = error.formattedMessage != null
        ? error.formattedMessage
        : error.message != null && error.message != ""
          ? error.message
          : httpStatus.STATUS_CODES[500]

      this.error_code = error.code != null && error.code != "" ? error.code : 0
      this.http_status_code = error.http_status_code
    }
    else if (error && error != "") {
      this.message = error
    }
  }
}

class UnauthorizedError extends ApplicationError {
  constructor() {
    super(applicationErrors.unauthorised);
  }
}

class RequestValidationError extends ApplicationError {
  constructor(errors, errorMessage) {
    super(!errorMessage ? applicationErrors.request_validation_error : errorMessage);

    if (errors) {
      this.errors = errors;
    }
  }
}

class AccountDoesNotExistError extends ApplicationError {
  constructor(symbol) {
    if (!symbol) {
      super(applicationErrors.account_no_exist)
    }
    else {
      let error = applicationErrors.account_known_symbol_does_not_exist
      error.formattedMessage = util.format(applicationErrors.account_known_symbol_does_not_exist.message, symbol)

      super(error)
    }
  }
}

class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super(applicationErrors.user_email_exist_error);
  }
}

class InsufficientUserAccountBalance extends ApplicationError {
  constructor(tradeSymbol) {
    let error = applicationErrors.trade_commit_user_account_insufficient_funds
    error.formattedMessage = util.format(applicationErrors.trade_commit_user_account_insufficient_funds.message, tradeSymbol)

    super(message)
  }
}

class InsufficientTradingAccountBalance extends ApplicationError {
  constructor(tradeSymbol) {
    let error = applicationErrors.trade_commit_trading_account_insufficient_funds
    error.formattedMessage = util.format(applicationErrors.trade_commit_trading_account_insufficient_funds.message, tradeSymbol)

    super(error)
  }
}


class InsufficientFundsInAccountError extends ApplicationError {
  constructor(symbol) {
    let error = applicationErrors.account_insufficient_funds
    error.formattedMessage = util.format(applicationErrors.account_insufficient_funds.message, symbol)

    super(error)
  }
}

class InsufficientFundsInMasterAccountError extends ApplicationError {
  constructor(type) {
    let error = applicationErrors.account_master_account_insufficient_funds
    error.formattedMessage = util.format(applicationErrors.account_master_account_insufficient_funds.message, type)

    super(error)
  }
}


class InternalError extends ApplicationError {
  constructor(error, context) {
    super(error, context);
  }
}

class DuplicateRequestInMinutesError extends ApplicationError {
  constructor(retryTimeInMinutes) {
    let error = applicationErrors.duplicate_request_in_minutes
    error.formattedMessage = util.format(applicationErrors.duplicate_request_in_minutes.message, retryTimeInMinutes)

    super(error)
  }
}
class DuplicateRequestInHoursError extends ApplicationError {
  constructor(retryTimeInHours) {
    let error = applicationErrors.duplicate_request_in_hours
    error.formattedMessage = util.format(applicationErrors.duplicate_request_in_hours.message, retryTimeInHours)

    super(error)
  }
}
class UserNotFoundError extends ApplicationError {
  constructor() {
    super(applicationErrors.user_not_found_error)
  }
}

class TransactionNotFoundError extends ApplicationError {
  constructor() {
    super(applicationErrors.transaction_not_found)
  }
}

class PasswordInvalidError extends ApplicationError {
  constructor() {
    super(applicationErrors.user_password_invalid_error);
  }
}

function formatErrorAsObject(err) {
  let error = {}

  error.timestamp = (new Date()).toISOString()
  error.severity = 'error'
  error.application_name = err.error_context ? err.error_context.application : constants.application.name
  error.http_status_code = err.http_status_code
  error.error_code = err.error_code
  error.message = err.message
  error.errors = err.errors || ''
  error.class_name = err.error_context ? err.error_context.class_name : ''
  error.method_name = err.error_context ? err.error_context.method : ''
  error.details = err.error_context ? err.error_context.details : ''
  error.stack = err.stack

  return error
}

function formatError(err, applicationError, lineSeparator) {
  let errorMessage = err.message;
  lineSeparator = !lineSeparator ? config.ERROR_NEW_LINE_SEPARATOR : lineSeparator

  if (err.errors) {
    let subErrorCount = 1
    errorMessage += lineSeparator
    for (let key in err.errors) {
      if (err.errors.hasOwnProperty(key)) {
        let currentError = err.errors[key]
        errorMessage += `${subErrorCount}: ${currentError.message}${lineSeparator}`
        subErrorCount++
      }
    }
  }

  let errorTimeStamp = (new Date()).toISOString()
  let response = null

  if (err.error_context) {
    response = `${lineSeparator}${errorTimeStamp}${lineSeparator}ERROR: ${err.error_context.application} > ${err.error_context.class_name}.${err.error_context.method}${lineSeparator}Status Code: ${err.http_status_code} | Error Code: ${err.error_code} | Error: ${errorMessage} ${lineSeparator}Details: ${JSON.stringify(err.error_context.details || `N/A`)}${lineSeparator}Stack: ${err.stack}${lineSeparator}`
  }
  else {
    response = `${lineSeparator}${errorTimeStamp}${lineSeparator}ERROR: ${constants.application.name}${lineSeparator}Status Code: ${err.http_status_code} | Error Code: ${err.error_code} | Error: ${errorMessage}${lineSeparator}Stack: ${err.stack}${lineSeparator}`
  }

  return response
}

module.exports = {
  ErrorContext,
  formatError,
  formatErrorAsObject,
  ApplicationError,
  UnauthorizedError,
  RequestValidationError,
  AccountDoesNotExistError,
  EmailAlreadyExistsError,
  InternalError,
  InsufficientUserAccountBalance,
  InsufficientTradingAccountBalance,
  InsufficientFundsInAccountError,
  InsufficientFundsInMasterAccountError,
  DuplicateRequestInMinutesError,
  DuplicateRequestInHoursError,
  UserNotFoundError,
  TransactionNotFoundError,
  PasswordInvalidError,
}
