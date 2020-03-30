const siteModel = require('../models/site.mongo')

module.exports = {
  async createSite(name) {
    let data = await siteModel.createSite(name)
    return data
  },

  async getSites() {
    let data = await siteModel.getSites()
    return data
  },

  async getSite(key) {
    let data = await siteModel.getSite(key)
    return data
  },

  async createAsset(name, face_encoding, hash, img, location) {
    let data = await siteModel.createAsset(name, face_encoding, hash, img, location)
    return data
  },

  async getAssets() {
    let data = await siteModel.getAssets()
    return data
  },

  async updateAsset(key, name) {
    let data = await siteModel.updateAsset(key, name)
    return data
  },

  async getAsset(key) {
    let data = await siteModel.getAsset(key)
    return data
  },

  async logEvent(asset_key, site_key) {
    let data = await siteModel.logEvent(asset_key, site_key)
    return data
  },

  async getEventsByAsset(asset_key) {
    let data = await siteModel.getEventsByAsset(asset_key)
    return data
  },

  async getEventsBySite(site) {
    let data = await siteModel.getEventsBySite(site)
    return data
  },
}
