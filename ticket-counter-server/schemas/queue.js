const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
	queueNumber: {
		type: Number,
		required: true,
	},

	status: {
		type: String,
		required: true,
		default: 'waiting',
	},
});

module.exports = mongoose.model('Queue', queueSchema);