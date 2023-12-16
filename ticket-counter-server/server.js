const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


const port = 3000;

app.get('/', function (req, res) {
	res.send('Hello World');
});

mongoose.connect(process.env.MONGODB_CONNECT);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () =>
	console.log(`MongoDB connected on ${process.env.MONGODB_CONNECT}`)
);

app.use(express.json());

const countersRouter = require('./routers/counters');
app.use('/counters', countersRouter);

const queuesRouter = require('./routers/queues');
app.use('/queues', queuesRouter);

app.listen(port, () => console.log(`Server started on  http://localhost:${port}`));