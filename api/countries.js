const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('../index');

const app = express.Router();
app.use(bodyParser.json());

app.get('/', (req, res) =>
{
    db.country.findAll()
        .then(arr =>
              {
                  let page = req.query.page? req.query.page: 1;
                  res.render('countries', {
                      pageNumber: page,
                      countries: arr.slice(25 * (page - 1), 25 * page),
                      countPages: Math.ceil(arr.length / 25)
                  });
              });
});

app.get('/[A-Z][A-Z][A-Z]/', (req, res) =>
{
    console.log('tratata')
});

module.exports = app;