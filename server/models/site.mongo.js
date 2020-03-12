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
    return data
  },
  async getSites() {
    const dbClient = db.getClient()
    return await dbClient.collection('sites').find({}, { projection: { _id: 0 } }).sort({ _id: -1 }).toArray()
  },

  async createAsset(name) {
    const key = crypto.randomBytes(12).toString('hex')
    const dbClient = db.getClient()
    const data = {
      key,
      name,
      removed: false,
      created: new Date(),
      modified: new Date()
    }
    await dbClient.collection('assets').insertOne(data)
    return data
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
    return data.value
  },

  async getAsset(key) {
    const dbClient = db.getClient()
    return await dbClient.collection('assets').findOne({ key }, { projection: { _id: 0 } })
  },

  async logVisit(asset_key, name, site_key) {
    const key = crypto.randomBytes(12).toString('hex')
    const dbClient = db.getClient()
    const data = {
      key,
      name,
      asset_key,
      site_key,
      type: 'VISIT',
      created: new Date()
    }
    await dbClient.collection('visits').insertOne(data)
    return data
  },

  async getVisitsByAsset(asset_key) {
    const dbClient = db.getClient()
    const visits = await dbClient.collection('visits')
      .find({ asset_key }, { projection: { _id: 0 } })
      .sort({ _id: -1 }).toArray()
    const totalCount = await dbClient.collection('visits').countDocuments({ asset_key })
    return { total_count: totalCount, visits: visits }
  },

  async getVisitsBySite() {
    const dbClient = db.getClient()
    const visits = await dbClient.collection('visits')
      .find({}, { projection: { _id: 0 } })
      .sort({ _id: -1 }).toArray()
    const totalCount = await dbClient.collection('visits').countDocuments({})
    return { total_count: totalCount, visits: visits }
  },
}
