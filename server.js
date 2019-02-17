'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', require('./api/products'));

app.listen(port, () => console.warn(`Listening on port ${port}`));

app.use(function(err, req, res, next){
  console.warn(err);
  res.status(500).send(err);
	res.end();
});

module.exports = app;
