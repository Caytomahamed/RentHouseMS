const handleFactory = require('./handleFactory');
const reportModel = require('../models/reportModel');

exports.getAllTransportationReport = handleFactory.getAll(reportModel);
