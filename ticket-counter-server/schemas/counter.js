const mongoose = require('mongoose');
const Queue = require('./queue');

const counterSchema = new mongoose.Schema({
	counterNumber: {
		type: Number,
		required: true,
	},
	queue: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Queue',
		required: false,
	},
});

module.exports = mongoose.model('Counter', counterSchema);