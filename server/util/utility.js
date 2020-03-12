const BigNumber = require('bignumber.js')

module.exports.roundUp = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
}

module.exports.roundUpETH = (num) => {
    return this.roundUp(num, 18)
}

module.exports.roundUpBTC = (num) => {
    return this.roundUp(num, 8)
}

module.exports.toBigNumber = (value, precision) => {
    let number = new BigNumber(value)
    if (precision) {
        number = this.roundUp(value, precision)
    }
    return number
}

module.exports.toBigNumberString = (value, precision) => {
    return this.toBigNumber(value, precision).toString()
}

module.exports.floor = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(num * precision) / precision;
}

module.exports.generateUnixTimestamp = () => {
    return Math.floor(new Date() / 1000);
}

module.exports.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.formatCurrency = (amount) => {
    return tidyCurrency(amount)
}

module.exports.tidyCurrencyAmount = (object) => {
    if (!object) { return object }

    if (object.amount) {
        object.amount = tidyCurrency(object.amount)
    }
    if (object.amount_locked) {
        object.amount_locked = tidyCurrency(object.amount_locked)
    } else {
        object.amount_locked = tidyCurrency(0)
    }
    if (object.amount_locked_deposit) {
        object.amount_locked_deposit = tidyCurrency(object.amount_locked_deposit)
    } else {
        object.amount_locked_deposit = tidyCurrency(0)
    }
    if (object.amount_locked_withdraw) {
        object.amount_locked_withdraw = tidyCurrency(object.amount_locked_withdraw)
    } else {
        object.amount_locked_withdraw = tidyCurrency(0)
    }
    return object
}

module.exports.compareBank = (bankInfo, bankInfoAlt) => {
    return (
        (bankInfo.swiftCode == bankInfoAlt.swiftCode) &&
        (bankInfo.accountName == bankInfoAlt.accountName) &&
        (bankInfo.accountNumber == bankInfoAlt.accountNumber) &&
        (bankInfo.bankAddress == bankInfoAlt.bankAddress))
}

module.exports.randomCode = (randomFlag, min, max) => {
    let str = "",
        range = min,
        arr = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        position = Math.round(Math.random() * (arr.length - 1));
        str += arr[position];
    }
    return str.toUpperCase();
}

module.exports.dateToUnixTimestamp = (time) => {
    let date = new Date(time)
    return Math.floor(date.getTime() / 1000);
}

module.exports.unixTimestampToDate = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000);
}

function tidyCurrency(amount) {
    if (!amount) {
        return 0
    }
    const result = parseFloat(amount)
    return result === 'NaN' ? 0 : parseFloat(amount);
}
