const handleFactory = require('./handleFactory');
const routeModel = require('../models/routeModel');

exports.getAllRoutes = handleFactory.getAll(routeModel);
exports.getRouteById = handleFactory.getOne(routeModel);
exports.updateRoute = handleFactory.updateOne(routeModel);
exports.createRoute = handleFactory.createOne(routeModel);
exports.deleteRoute = handleFactory.deleteOne(routeModel);
