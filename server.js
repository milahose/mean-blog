const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const routs = require('./routes');
require('dotenv').config();

mongoose
	.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('Connected to database!'))
	.then(null, err => console.log(`Unable to connect to database: ${err}`))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routs);

app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => console.log(`Listening on port ${port}`));