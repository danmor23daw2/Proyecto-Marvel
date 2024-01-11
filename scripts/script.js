let hulkId = 1009351;
let thorId = 1009664;
let ironmanId = 1009368;
let cpAmericaId = 1009220;
let spiderManId = 1009610;

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

            let superheroe = respuestaPersonaje.data.results[0];

            let superheroeInfoContainer = document.getElementById('superheroInfo');
            superheroeInfoContainer.innerHTML = `
            <br><br><br><br>
                <img class="img2" src="${superheroe.thumbnail.path}.${superheroe.thumbnail.extension}" alt="${superheroe.name}">
            `;

            let comics = superheroe.comics.items;
            comics.slice(0, 6).forEach(function (comic) {
                superheroeInfoContainer.innerHTML += `<p>${comic.name}</p>`;
            });
        } else {
            console.error('Error en la solicitud. Código de estado:', personajeXHR.status);
        }
    };

    personajeXHR.onerror = function () {
        console.error('Error de red al intentar realizar la solicitud.');
    };

    personajeXHR.send();
}