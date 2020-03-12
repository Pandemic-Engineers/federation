const Decimal = require('mongodb').Decimal128;

module.exports.toDecimal128 = (val) => {
    return Decimal.fromString(val.toString());
}