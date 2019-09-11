const rp = require('request-promise');
const $ = require('cheerio');

const getPersonaggiData = async (html, filmIndex, filmName) => {
    html = html.substring(html.indexOf('<a href="/wiki/Doppiaggio" title="Doppiaggio">Doppiatori originali</a>'), html.indexOf('<a href="/wiki/Doppiaggio" title="Doppiaggio">Doppiatori italiani</a>'));
    console.log(html);

    const personaggiMap = $('li > a', html)
        .map((index, element) => {
            var personaggio = element.children[0].data;

            return {
                filmIndex,
                filmName,
                index,
                name: personaggio
            }
        })
        .get();

    console.log(personaggiMap);
}

module.exports = getPersonaggiData;