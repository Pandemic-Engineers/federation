const crypto = require('crypto')
const db = require('../../config/mongodb')

module.exports = {
  async createSite(name) {
    const key = crypto.randomBytes(12).toString('hex')
    const dbClient = db.getClient()
    const data = {
      key,
      name,
      removed: false,
      created: new Date(),
      modified: new Date()
    }

    await dbClient.collection('sites').insertOne(data)

    return { result: 'SUCCESS', key }
  },

  async getSites() {
    const dbClient = db.getClient()
    return await dbClient.collection('sites').find({}, { projection: { _id: 0, removed: 0 } }).sort({ _id: -1 }).toArray()
  },

  async getSite(key) {
    const dbClient = db.getClient()
    return await dbClient.collection('sites').findOne({ key }, { projection: { _id: 0 } })
  },

  async createAsset(name, face_encoding, hash, img, location) {
    const key = crypto.randomBytes(12).toString('hex')
    const dbClient = db.getClient()
    const data = {
      key,
      name,
      face_encoding,
      hash,
      img,
      location,
      removed: false,
      created: new Date(),
      modified: new Date()
    }
    await dbClient.collection('assets').insertOne(data)
    return { result: 'SUCCESS', key }
  },

  async getAssets() {
    const dbClient = db.getClient()
    return await dbClient.collection('assets').find({}, { projection: { _id: 0 } }).sort({ _id: -1 }).toArray()
  },

  async updateAsset(key, name) {
    const dbClient = db.getClient()
    const data = {
      name,
      modified: new Date()
    }
    await dbClient.collection('assets').findOneAndUpdate({ key }, { $set: data }, { projection: { _id: 0 }, returnOriginal: false })
    return { result: 'SUCCESS', key } // should return if it is successful
  },

  async getAsset(key) {
    const dbClient = db.getClient()
    return await dbClient.collection('assets').findOne({ key }, { projection: { _id: 0 } })
  },

  async logEvent(asset, site) {
    const key = crypto.randomBytes(12).toString('hex')
    const dbClient = db.getClient()
    const data = {
      key,
      asset,
      site,
      type: 'VISIT',
      created: new Date()
    }
    await dbClient.collection('events').insertOne(data)
    return { result: 'SUCCESS', key }
  },

  async getEventsByAsset(asset) {
    const dbClient = db.getClient()
    const events = await dbClient.collection('events')
      .find({ asset }, { projection: { _id: 0 } })
      .sort({ _id: -1 }).toArray()
    const totalCount = await dbClient.collection('events').countDocuments({ asset })
    return { total_count: totalCount, events: events }
  },

  async getEventsBySite(site) {
    const dbClient = db.getClient()
    const events = await dbClient.collection('events')
      .find({ site }, { projection: { _id: 0 } })
      .sort({ _id: -1 }).toArray()
    const totalCount = await dbClient.collection('events').countDocuments({})
    return { total_count: totalCount, events: events }
  },
}
