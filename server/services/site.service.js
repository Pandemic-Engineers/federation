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

  async createAsset(name) {
    let data = await siteModel.createAsset(name)
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
  async logEvent(asset_key, name, site_key) {
    let data = await siteModel.logEvent(asset_key, name, site_key)
    return data
  },

  async getEventsByAsset(asset_key) {
    let data = await siteModel.getEventsByAsset(asset_key)
    return data
  },
  async getEventsBySite() {
    let data = await siteModel.getEventsBySite()
    return data
  },
}
