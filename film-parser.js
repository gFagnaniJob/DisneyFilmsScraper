const rp = require('request-promise');
const $ = require('cheerio');

const baseITAURL = 'https://it.wikipedia.org';
const classiciITAURL = '/wiki/Classici_Disney';

// const baseENURL = 'https://en.wikipedia.org';
// const classiciENURL = '/wiki/List_of_Walt_Disney_Animation_Studios_films';

const charactersParser = require('./characters-parser');

const getFilmData = async () => {
    const html = await rp(baseITAURL + classiciITAURL);

    const filmMap = $('#Elenco_completo', html).parent().next().find('tbody > tr').next().find('tr > td > i > a')
        .map(async (index, element) => {
            const link = baseITAURL + element.attribs.href;
            const name = element.children[0].data;

            const innerHTML = await rp(link);

            charactersParser(innerHTML, index+1, name, link);

            return {
                index: index + 1,
                name,
                // personaggiMap,
                link: link.indexOf(".php") > -1 ? null : link
            }
        })
        .get();

    return Promise.all(filmMap);
}

// getFilmData()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })

module.exports = getFilmData;