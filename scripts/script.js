const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=8";
const randomOffset = `offset=${Math.round(Math.random() * 100)}`;

function getSuperheroInfo() {
    const characterId = "1009351";
    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    var characterXhr = new XMLHttpRequest();

    characterXhr.open('GET', url, true);

    characterXhr.onload = function () {
        if (characterXhr.status >= 200 && characterXhr.status < 300) {
            var characterResponse = JSON.parse(characterXhr.responseText);

            var superhero = characterResponse.data.results[0];

            var superheroInfoContainer = document.getElementById('superheroInfo');
            superheroInfoContainer.innerHTML = `
            <br><br><br><br>
                <img class="img2"src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
            `;

            var comics = superhero.comics.items;
            comics.slice(0, 6).forEach(function (comic) {
                superheroInfoContainer.innerHTML += `<p>${comic.name}</p>`;
            });
        } else {
            console.error('Error en la solicitud. Código de estado:', characterXhr.status);
        }
    };

    characterXhr.onerror = function () {
        console.error('Error de red al intentar realizar la solicitud.');
    };

    characterXhr.send();
}
function getSuperheroInfo2() {
    const characterId = "1009664";
    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    var characterXhr = new XMLHttpRequest();

    characterXhr.open('GET', url, true);

    characterXhr.onload = function () {
        if (characterXhr.status >= 200 && characterXhr.status < 300) {
            var characterResponse = JSON.parse(characterXhr.responseText);

            var superhero = characterResponse.data.results[0];

            var superheroInfoContainer = document.getElementById('superheroInfo');
            superheroInfoContainer.innerHTML = `
            <br><br><br><br>
                <img class="img2"src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
                <p>${superhero.description}</p>
            `;

            var comics = superhero.comics.items;
            comics.slice(0, 5).forEach(function (comic) {
                superheroInfoContainer.innerHTML += `<p>${comic.name}</p>`;
            });
        } else {
            console.error('Error en la solicitud. Código de estado:', characterXhr.status);
        }
    };

    characterXhr.onerror = function () {
        console.error('Error de red al intentar realizar la solicitud.');
    };

    characterXhr.send();
}
function md5(value) {
    
}
