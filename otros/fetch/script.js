const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=7";
const randomOffset = `offset=${Math.round(Math.random() * 1473)}`;

function obtenerImagenesAleatorias() {
    const url = `http://gateway.marvel.com/v1/public/characters?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(respuestaPersonajes => {
            const personajes = respuestaPersonajes.data.results;

            const personajeInfoContainer = document.getElementById('personajeInfo');
            personajeInfoContainer.innerHTML = "";

            personajes.forEach(personaje => {
                personajeInfoContainer.innerHTML += `
                    <div class="personaje" data-id="${personaje.id}">
                        <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                        <h2 class="personajeTexto">${personaje.name}</h2>
                    </div>
                `;
            });

            const personajesElements = document.getElementsByClassName('personaje');

            for (let i = 0; i < personajesElements.length; i++) {
                personajesElements[i].addEventListener('click', function () {
                    const personajeId = personajesElements[i].getAttribute('data-id');
                    obtenerComicsDelPersonaje(personajeId);
                });
            }
        })
        .catch(error => {
            console.error('Error al intentar realizar la solicitud:', error.message);
        });
}
function obtenerComicsDelPersonaje(personajeId) {
    const comicsUrl = `http://gateway.marvel.com/v1/public/characters/${personajeId}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}`;

    fetch(comicsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(respuestaComics => {
            const comics = respuestaComics.data.results;

            const comicsInfoContainer = document.getElementById('comicsInfo');
            comicsInfoContainer.innerHTML = "";

            comics.forEach(comic => {
                comicsInfoContainer.innerHTML += `
                    <div class="comicsTransiciones">
                        <img class="img" src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error al intentar obtener la información de los cómics:', error.message);
        });
}

function buscarPersonajes() {
    const inputBuscar = document.getElementById('inputBuscar');
    const buscar = inputBuscar.value;

    const url = `http://gateway.marvel.com/v1/public/characters?${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${buscar}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(respuestaBusqueda => {
            const personajesBusqueda = respuestaBusqueda.data.results;

            const personajeInfoContainer = document.getElementById('personajeInfo');
            personajeInfoContainer.innerHTML = "";

            personajesBusqueda.forEach(personaje => {
                personajeInfoContainer.innerHTML += `
                    <div class="personaje" data-id="${personaje.id}">
                        <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                        <h2 class="personajeTexto">${personaje.name}</h2>
                    </div>
                `;
            });

            const personajesElements = document.getElementsByClassName('personaje');

            for (let i = 0; i < personajesElements.length; i++) {
                personajesElements[i].addEventListener('click', function () {
                    const personajeId = personajesElements[i].getAttribute('data-id');
                    obtenerComicsDelPersonaje(personajeId);
                });
            }
        })
        .catch(error => {
            console.error('Error al intentar realizar la búsqueda:', error.message);
        });
}


obtenerImagenesAleatorias();