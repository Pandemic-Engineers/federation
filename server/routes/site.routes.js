const siteController = require('./../controllers/site.controller')
const asyncHandler = require('express-async-handler')
const siteSchema = require('../schemas/site')

module.exports = function (app) {
  app.route(`/sites`)
    .post(siteSchema.create_site, asyncHandler(siteController.createSite))
    .get(asyncHandler(siteController.getSites))

  app.route(`/assets`)
    .post(siteSchema.create_asset, asyncHandler(siteController.createAsset))
    .get(asyncHandler(siteController.getAssets))

  app.route(`/assets/:key`)
    .put(siteSchema.create_asset, asyncHandler(siteController.updateAsset))
    .get(asyncHandler(siteController.getAsset))
  //.delete(asyncHandler(siteController.removeAsset))

  app.get('/assets/all/visits', asyncHandler(siteController.getVisitsBySite))
  app.get(`/assets/:key/visits`, asyncHandler(siteController.getVisitsByAsset))
  app.route(`/assets/:key/visit`)
    .post(siteSchema.log_visit, asyncHandler(siteController.logVisit))

}
