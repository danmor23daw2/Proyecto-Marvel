let hulkId = 1009351;
let thorId = 1009664;
let ironmanId = 1009368;
let cpAmericaId = 1009220;
let spiderManId = 1009610;
let lokiId = 1009407;
let deadpoolId = 1009268;
let wolverineId = 1009718;

const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=8";
const randomOffset = `offset=${Math.round(Math.random() * 100)}`;

function superHeroeInfo(characterId) {
    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    let personajeXHR = new XMLHttpRequest();

    personajeXHR.open('GET', url, true);

    personajeXHR.onload = function () {
        if (personajeXHR.status >= 200 && personajeXHR.status < 300) {
            let respuestaPersonaje = JSON.parse(personajeXHR.responseText);

            let comics = respuestaPersonaje.data.results;

            let comicsInfoContainer = document.getElementById('comicsInfo');
            comicsInfoContainer.innerHTML = "";

            comics.forEach(comic => {
                comicsInfoContainer.innerHTML += `
                <img class="img2" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                `;
            });          
        }
    };

    personajeXHR.onerror = function () {
        console.error('Error de red al intentar realizar la solicitud.');
    };

    personajeXHR.send();
}

document.getElementById('hulkImagen').addEventListener('click', function () {
    superHeroeInfo(hulkId);
});

document.getElementById('thorImagen').addEventListener('click', function () {
    superHeroeInfo(thorId);
});

document.getElementById('ironmanImagen').addEventListener('click', function () {
    superHeroeInfo(ironmanId);
});

document.getElementById('cpAmericaImagen').addEventListener('click', function () {
    superHeroeInfo(cpAmericaId);
});

document.getElementById('spiderManImagen').addEventListener('click', function () {
    superHeroeInfo(spiderManId);
});

document.getElementById('LokiImagen').addEventListener('click', function () {
    superHeroeInfo(lokiId);
});

document.getElementById('DeadpoolImage').addEventListener('click', function () {
    superHeroeInfo(deadpoolId);
});
document.getElementById('WolverineImage').addEventListener('click', function () {
    superHeroeInfo(wolverineId);
});
