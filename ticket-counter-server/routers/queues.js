const express = require('express');
const router = express.Router();
const Queue = require('../schemas/queue');
const Counter = require('../schemas/counter');

// get all queues number
router.get('/', async (req, res) => {
	try {
		const queues = await Queue.find();
		res.json(queues);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create new queue
router.post('/', async (req, res) => {
	// user must get the queue numbers first before creating a new queue

	const queue = new Queue({
		queueNumber: req.body.queueNumber,
	});

	try {
		const newQueue = await queue.save();
		res.status(201).json(newQueue);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// get queue by id
router.get('/:id', async (req, res) => {
	try {
		const queue = await Queue.findById(req.params.id);
		res.json(queue);
	} catch (error) {
		res.status(500).json({ message: err.message });
	}
});

// delete queue by id from list
router.delete('/:id', async (req, res) => {
	try {
		const queue = await Queue.findOne({ _id: req.params.id });
		if (queue) {
			await queue.deleteOne();
			res.json({ message: 'Queue deleted' });
		} else {
			res.status(400).json({ message: 'Cannot delete this queue' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;