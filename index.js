const csv = require('objects-to-csv');
const filmParser = require('./film-parser');

filmParser()
    .then(data => {
        var personaggiAndFilms = [];
        var personaggi = [];
        var films = [];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                personaggi.push({
                    personaggio_id: data[i][j].index,
                    personaggio_nome: data[i][j].name
                });
            }
            if (data[i][0]) {
                films.push({
                    film_id: data[i][0].filmIndex,
                    film_titolo: data[i][0].filmName,
                    personaggi_lista: personaggi
                });
            }
            personaggi = [];
        }

        console.log(films);
        const transformed = new csv(films);
        return transformed.toDisk("./disneyData.csv");
    })
    .catch(err => {
        console.log(err);
    });