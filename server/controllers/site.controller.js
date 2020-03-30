const siteService = require('../services/site.service')
const { validationResult } = require('express-validator')
const error = require('../util/applicationError')
const s3Upload = require('../util/s3Upload')

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
  async getSite(req, res) {
    const key = req.params.key
    try {
      const data = await siteService.getSite(key)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getSite', { key })
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
      const result = await s3Upload.uploadAssetImg(req, res)
      if (result.success) {
        const name = req.body.name
        const face_encoding = req.body.face_encoding
        const hash = req.body.hash

        const img = result.s3_key
        const location = result.location
        const data = await siteService.createAsset(name, face_encoding, hash, img, location)
        return res.json(data)
      } else {
        if (result.error_code === 104) {
          throw new error.ApplicationError(applicationErrors.asset_create_file_required_error)
        }
      }
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

  async logEvent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.formatWith((error) => { return { message: error.msg } })
      throw new error.RequestValidationError(errors.mapped())
    }
    const asset_key = req.params.key
    const site_key = req.body.site
    try {
      const data = await siteService.logEvent(asset_key, site_key)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'logEvent')
      throw err
    }
  },

  async getEventsByAsset(req, res) {
    const asset = req.params.key
    try {
      const data = await siteService.getEventsByAsset(asset)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getEventsByAsset', { asset })
      throw err
    }
  },

  async getEventsBySite(req, res) {
    const site = req.params.key
    try {
      const data = await siteService.getEventsBySite(site)
      return res.json(data)
    }
    catch (err) {
      err.context = new error.ErrorContext('site', 'getEventsBySite', { site })
      throw err
    }
  },
}
