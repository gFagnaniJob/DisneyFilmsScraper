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

        var listaFilm = [];

        for (var i=0; i<data.length; i++) {
            var listaPersonaggi = [];
            for (var j=0; j<data[i].length; j++) {
                listaPersonaggi.push(data[i][j].name);
            }
            if (data[i][0]) {
                listaFilm.push({
                    film_id: data[i][0].filmIndex,
                    film_titolo: data[i][0].filmName,
                    personaggi_lista: listaPersonaggi
                });
            }
        }

        const csv1 = new csv(films);
        const csv2 = new csv(listaFilm);
        csv1.toDisk("./disneyData1.csv");
        csv2.toDisk("./disneyData2.csv");
        return console.log("Personaggi catalogati");
    })
    .catch(err => {
        console.log(err);
    });