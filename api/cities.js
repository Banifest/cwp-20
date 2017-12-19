const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('../index');

const app = express.Router();
app.use(bodyParser.json());


app.get('/[0-9]*/', (req, res) =>
{

    async function sample()
    {
        let city = await db.city.findById(req.url.slice(1));
        let country = await db.country.findAll({where: {Code: city.dataValues.CountryCode}});
        let languages = await db.countryLanguage.findAll({where: {CountryCode: city.dataValues.CountryCode, IsOfficial: 'T'}});
        let capital = await db.city.findById(country[0].dataValues.Capital);

        res.render('city',
                   {
                       city: city.dataValues,
                       country: country[0].dataValues,
                       languages: languages,
                       capital: capital.dataValues,
                   });

    }
    sample();
});

module.exports = app;