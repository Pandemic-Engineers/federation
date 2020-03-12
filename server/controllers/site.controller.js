const siteService = require('../services/site.service')
const { validationResult } = require('express-validator')
const error = require('../util/applicationError')

module.exports = {
  async createSite(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.formatWith((error) => { return { message: error.msg } })
      throw new error.RequestValidationError(errors.mapped())
    }

    try {
      const name = req.body.name
      const data = await siteService.createSite(name)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'createSite')
      throw err
    }
  },
  async getSites(req, res) {
    try {
      const data = await siteService.getSites()
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getSites')
      throw err
    }
  },

  async createAsset(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.formatWith((error) => { return { message: error.msg } })
      throw new error.RequestValidationError(errors.mapped())
    }

    try {
      const name = req.body.name
      const data = await siteService.createAsset(name)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'createAsset')
      throw err
    }
  },
  async getAssets(req, res) {
    try {
      const data = await siteService.getAssets()
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getAssets')
      throw err
    }
  },
  async updateAsset(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.formatWith((error) => { return { message: error.msg } })
      throw new error.RequestValidationError(errors.mapped())
    }
    const key = req.params.key

    try {
      const name = req.body.name
      const data = await siteService.updateAsset(key, name)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'updateAsset')
      throw err
    }
  },
  async getAsset(req, res) {
    const key = req.params.key
    try {
      const data = await siteService.getAsset(key)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getAsset', { key })
      throw err
    }
  },

  async logVisit(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.formatWith((error) => { return { message: error.msg } })
      throw new error.RequestValidationError(errors.mapped())
    }
    const asset_key = req.params.key
    const site_key = req.body.site_key
    const name = req.body.name
    try {
      const data = await siteService.logVisit(asset_key, name, site_key)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'logVisit')
      throw err
    }
  },

  async getVisitsByAsset(req, res) {
    const asset_key = req.params.key
    try {
      const data = await siteService.getVisitsByAsset(asset_key)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getVisitsByAsset')
      throw err
    }
  },
  async getVisitsBySite(req, res) {
    try {
      //site key ?
      const data = await siteService.getVisitsBySite()
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getVisitsBySite')
      throw err
    }
  },
}
