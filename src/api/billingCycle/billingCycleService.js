const BillingCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after('post', errorHandler).after('put', errorHandler);

BillingCycle.route('get', (req, res, next) => {
	BillingCycle.find({}, (err, docs) => {
		if (!err) {
			res.status(200).json(docs);
		} else {
			res.status(500).json({ errors: [err] });
		}
	}).skip(req.query.skip).limit(req.query.limit);
});

BillingCycle.route('count', (req, res, next) => {
	BillingCycle.count((err, value) => {
		if (err) {
			res.status(500).json({ error: [err] })
		} else {
			res.status(200).json({ value });
		}
	});
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debits.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debit: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debit: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle;