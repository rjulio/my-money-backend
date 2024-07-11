const express = require('express');

module.exports = function(server) {
	// define base url to routes
	const router = express.Router();
	server.use('/api', router);

	// map all billing cycle routes
	const BillingCycle = require('../api/billingCycle/billingCycleService');
	BillingCycle.register(router, '/billingCycles');
}