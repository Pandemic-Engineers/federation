const CustomError = require('./custom-error');

module.exports.handleApiError = (err) => {
  if (err.statusCode == 400 || err.statusCode == 422) {
    let data;
    try {
      const error = err.error;
      data = JSON.parse(error);
    }
    catch (e) { }
    if (data) {
      if (data.message) {
        return new CustomError(data.message, 400)
      } else if (data.error) {
        return new CustomError(data.error, 400)
      }
    }
  }
  return err;
}