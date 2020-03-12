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
  async logVisit(asset_key, name, site_key) {
    let data = await siteModel.logVisit(asset_key, name, site_key)
    return data
  },

  async getVisitsByAsset(asset_key) {
    let data = await siteModel.getVisitsByAsset(asset_key)
    return data
  },
  async getVisitsBySite() {
    let data = await siteModel.getVisitsBySite()
    return data
  },
}
