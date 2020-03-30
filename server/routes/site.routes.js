const siteController = require('./../controllers/site.controller')
const asyncHandler = require('express-async-handler')
const siteSchema = require('../schemas/site')

module.exports = function (app) {
  app.route(`/sites`)
    .post(siteSchema.create_site, asyncHandler(siteController.createSite))
    .get(asyncHandler(siteController.getSites))
  app.route(`/sites/:key`)
    .get(asyncHandler(siteController.getSite))

  app.route(`/assets`)
    .post(asyncHandler(siteController.createAsset))
    .get(asyncHandler(siteController.getAssets))

  app.route(`/assets/:key`)
    .put(siteSchema.create_asset, asyncHandler(siteController.updateAsset))
    .get(asyncHandler(siteController.getAsset))
  //.delete(asyncHandler(siteController.removeAsset))

  app.get(`/sites/:key/events`, asyncHandler(siteController.getEventsBySite))
  app.get(`/assets/:key/events`, asyncHandler(siteController.getEventsByAsset))

  app.route(`/assets/:key/events`)
    .post(siteSchema.log_event, asyncHandler(siteController.logEvent))

}
