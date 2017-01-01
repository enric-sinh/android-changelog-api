const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const changesRoutes = require('./route/changes');

// Create app
const app = express();
app.set('etag', false);
app.set('x-powered-by', false);

// Configure middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add routes
app.use('/changes', changesRoutes);

// Map unknown requests to 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Catch all errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ "message": err.message });
});

app.listen(process.env.PORT || 8080);