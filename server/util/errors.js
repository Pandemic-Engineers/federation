const httpStatus = require('../http_status')

let errors = {
    // core http errors
    unauthorised: { message: httpStatus.STATUS_CODES[401], code: 10, http_status_code: 401 },

    // request validation (end point) errors
    request_validation_error: { message: 'The request failed due to a validation error.', code: 101, http_status_code: 400 },
    request_validation_error_login: { message: 'Log in failed due to a validation error.', code: 102, http_status_code: 422 },
    duplicate_request_error_ten_seconds: { message: 'You have submitted a request within the past 10 seconds, please wait and try again.', code: 107, http_status_code: 400 },
    duplicate_request_error_five_seconds: { message: 'You have submitted a request within the past 5 seconds, please wait and try again.', code: 108, http_status_code: 400 },
    duplicate_request_in_minutes: { message: 'Duplicate request, please try again in %s minute(s).', code: 109, http_status_code: 422 },
    duplicate_request_in_hours: { message: 'Duplicate request, please try again in %s hour(s).', code: 110, http_status_code: 422 },

    user_email_exist_error: { message: 'This email address is already in use.', code: 1100, http_status_code: 400 },
    user_register_username_required: { message: 'Please provide first and last name.', code: 1101, http_status_code: 400 },
    user_register_email_password_required: { message: 'Password is required.', code: 1102, http_status_code: 400 },
    user_login_email_password_required: { message: 'Please provide both email address and password.', code: 1103, http_status_code: 400 },
    user_login_email_password_incorrect: { message: 'Email address or password is incorrect.', code: 1104, http_status_code: 400 },

    // account application errors
    account_no_exist: { message: 'This account does not exist.', code: 1201, http_status_code: 400 },
    account_insufficient_funds: { message: 'Insufficient funds in the %s account to complete transaction.', code: 1202, http_status_code: 400 },
    account_create_master_duplicate: { message: 'There is an existing fund with the same symbol, please try again with a different symbol.', code: 1203, http_status_code: 400 },
    account_create_duplicate_error: { message: 'An account with the same symbol and type already exists', code: 1204, http_status_code: 400 },
    account_create_type_symbol_invalid_error: { message: 'Please double check account type', code: 1205, http_status_code: 400 },
    account_invalid_savings_type_error: { message: 'Account type should be savings', code: 1206, http_status_code: 400 },
    account_invalid_type_error: { message: 'Incorrect account type', code: 1207, http_status_code: 400 },
    account_extkey_null_error: { message: 'Account unavailable.', code: 1208, http_status_code: 400 },
    account_master_account_insufficient_funds: { message: 'Insufficient funds in the %s account to complete transaction. Please contact customer service.', code: 1209, http_status_code: 400 },

    fund_isnot_pending_error: { message: 'Fund must be in a pending state.', code: 1211, http_status_code: 400 },
    fund_is_not_available_error: { message: 'Fund is not available.', code: 1212, http_status_code: 400 },
    fund_is_not_complete_error: { message: 'Fund must be in a completed state.', code: 1214, http_status_code: 400 },

    // transaction application errors
    transaction_not_enough_amount: { message: 'Insufficient funds to complete transaction.', code: 2101, http_status_code: 400 },
    transaction_too_small: { message: 'Funds transferred is too small.', code: 2102, http_status_code: 400 },
    transaction_account_type_not_support: { message: 'Account type is not supported.', code: 2103, http_status_code: 400 },
    transaction_same_accounts: { message: 'Sender and recipient cannot be the same.', code: 2104, http_status_code: 400 },
    transaction_not_found: { message: 'The transaction address was not found.', code: 2105, http_status_code: 404 },
}

module.exports = errors
