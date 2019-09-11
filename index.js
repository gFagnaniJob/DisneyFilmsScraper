const csv = require('objects-to-csv');
const filmParser = require('./film-parser');

filmParser()
    .then(data => {
        console.log(data);
        const transformed = new csv(data);
        return transformed.toDisk("./disneyData.csv");
    })
    .catch(err => {
        console.log(err);
    });