const express = require('express');
const router = express.Router();
const Counter = require('../schemas/counter');
const Queue = require('../schemas/queue');

// get all counters
router.get('/', async (req, res) => {
	try {
		const counters = await Counter.find();
		res.json(counters);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create new counter
router.post('/', async (req, res) => {
	const counter = new Counter({
		counterNumber: req.body.counterNumber,
	});

	try {
		const newCounter = await counter.save();
		res.status(201).json(newCounter);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// update counter add queue in it
router.patch('/:id', async (req, res) => {
	try {
		const counter = await Counter.findById(req.params.id);
		const queue = await Queue.findById(req.body.queueId);
		if (counter.queue) {
			res.status(400).json({ message: 'Counter is already occupied' });
		} else {
			queue.status = 'serving';
			counter.queue = queue;
			await queue.save();
			await counter.save();
			res.json({ message: 'Queue added to counter', queue: queue });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// delete queue from counter
router.patch('/:id/delete', async (req, res) => {
	try {
		const counter = await Counter.findById(req.params.id);
		const queue = await Queue.findById(counter.queue);
		if (counter.queue) {
			counter.queue = null;
			await counter.save();
			queue.status = 'waiting';
			await queue.save();
			res.json({ message: 'Queue deleted from counter' });
		} else {
			res.status(400).json({ message: 'Counter is empty' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;