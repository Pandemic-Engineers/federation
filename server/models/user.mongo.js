const dbTable = 'users'
const crypto = require('crypto')
const db = require('../../config/mongodb')
module.exports = {
    async checkEmailExist(email) {
        const dbClient = db.getClient()
        const data = await dbClient.collection(dbTable).countDocuments({ email })
        return data > 0
    },
    async create(user) {
        const dbClient = db.getClient()
        const key = crypto.randomBytes(18).toString('hex')
        let data = {
            key: key,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email.toLowerCase(),
            salt: user.salt,
            hash: user.hash,
            removed: false,
            created: new Date(),
            modified: new Date(),
        }
        await dbClient.collection(dbTable).insertOne(data)
        return key
    },
    async getByKey(key) {
        const dbClient = db.getClient()
        return await dbClient.collection(dbTable).findOne({ key: key }, { projection: { '_id': 0, salt: 0, hash: 0, removed: 0 } })
    },

    async getByEmail(email) {
        const dbClient = db.getClient()
        return await dbClient.collection(dbTable).findOne({ email: email }, { projection: { '_id': 0 } })
    },
}