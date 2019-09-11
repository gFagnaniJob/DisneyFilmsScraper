const filmParser = require('./film-parser');

filmParser()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });