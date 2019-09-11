const rp = require('request-promise');
const $ = require('cheerio');

const getPersonaggiData = async (html, filmIndex, filmName) => {
    html = html.substring(html.indexOf('<a href="/wiki/Doppiaggio" title="Doppiaggio">Doppiatori originali</a>'), html.indexOf('<a href="/wiki/Doppiaggio" title="Doppiaggio">Doppiatori italiani</a>'));

    const personaggiMap = $('ul > li', html)
        .map((index, element) => {

            var personaggio = $(element).text();
            personaggio = personaggio.substring(personaggio.indexOf(": ")+2, personaggio.length);

            return {
                filmIndex,
                filmName,
                index,
                name: personaggio
            }
        })
        .get();

        return Promise.all(personaggiMap);
}

module.exports = getPersonaggiData;