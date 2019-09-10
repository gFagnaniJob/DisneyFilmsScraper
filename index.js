const rp = require('request-promise');
const $ = require('cheerio');

const baseURL = 'https://it.wikipedia.org';
const classiciURL = '/wiki/Classici_Disney';



const getFilmData = async () => {
    const html = await rp(baseURL + classiciURL);

    ($('#Elenco_completo', html).parent().next().find('tbody > tr').next().find('tr > td > i > a').length);
    const filmMap = $('#Elenco_completo', html).parent().next().find('tbody > tr').next().find('tr > td > i > a')
        .map(async (index, element) => {
            const link = baseURL + element.attribs.href;
            const name = element.children[0].data;

            const innerHTML = await rp(link);
            // const personaggi = $("#Personaggi", innerHTML).next().next().find('li > a')
            //     .map((index, element) => {
            //         const name = element.children[0].data;
            //         return {
            //             index: index+1,
            //             name
            //         }
            //     });

            // console.log(innerHTML);

            const personaggiMap = $(".sinottico_testo_centrale > div > ul > li", innerHTML)
                .map((index, element) => {
                    const name = element.children[0].data;
                    console.log(name);
                });


            return {
                index: index + 1,
                name,
                personaggiMap,
                link: link.indexOf(".php") > -1 ? null : link
            }
        })
        .get();

    return Promise.all(filmMap);
}

getFilmData()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })