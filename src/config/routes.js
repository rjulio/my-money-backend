const express = require('express');
const auth = require('./auth');

module.exports = function(server) {

// PROTECTED ROUTES

	const protectedApi = express.Router();
	server.use('/api', protectedApi);

	protectedApi.use(auth);

	const BillingCycle = require('../api/billingCycle/billingCycleService');
	BillingCycle.register(protectedApi, '/billingCycles');

// OPEN ROUTES

	const openApi = express.Router();
	server.use('/oapi', openApi);

	const AuthService = require('../api/user/authService');
	openApi.post('/login', AuthService.login);
	openApi.post('/signup', AuthService.signup);
	openApi.post('/validateToken', AuthService.validateToken);

	// define base url to routes
	// const router = express.Router();
	// server.use('/api', router);

	// map all billing cycle routes
	// const BillingCycle = require('../api/billingCycle/billingCycleService');
	// BillingCycle.register(router, '/billingCycles');
}