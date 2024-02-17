const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=7";
const randomOffset = `offset=${Math.round(Math.random() * 1473)}`;

function obtenerImagenesAleatorias() {
    const url = `http://gateway.marvel.com/v1/public/characters?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;

    let personajesXHR = new XMLHttpRequest();

    personajesXHR.open('GET', url, true);

    personajesXHR.onload = function () {
        if (personajesXHR.status >= 200 && personajesXHR.status < 300) {
            let respuestaPersonajes = JSON.parse(personajesXHR.responseText);
            let personajes = respuestaPersonajes.data.results;

            let personajeInfoContainer = document.getElementById('personajeInfo');
            personajeInfoContainer.innerHTML = "";

            personajes.forEach(personaje => {
                personajeInfoContainer.innerHTML += `
                    <div class="personaje" personaje-id="${personaje.id}">
                        <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                        <h2 class="personajeTexto">${personaje.name}</h2>
                    </div>
                `;
            });

            let personajes_id = document.getElementsByClassName('personaje');

            for (let i = 0; i < personajes_id.length; i++) {
                personajes_id[i].addEventListener('click', function () {
                    let personajeId = personajes_id[i].getAttribute('personaje-id');
                    obtenerComicsDelPersonaje(personajeId);
                });
            }
            
        }
    };

    personajesXHR.onerror = function () {
        console.error('Error de red al intentar realizar la solicitud.');
    };

    personajesXHR.send();
}

function obtenerComicsDelPersonaje(personajeId) {
    const comicsUrl = `http://gateway.marvel.com/v1/public/characters/${personajeId}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}`;

    let comicsXHR = new XMLHttpRequest();

    comicsXHR.open('GET', comicsUrl, true);

    comicsXHR.onload = function () {
        if (comicsXHR.status >= 200 && comicsXHR.status < 300) {
            let respuestaComics = JSON.parse(comicsXHR.responseText);
            let comics = respuestaComics.data.results;

            let comicsInfoContainer = document.getElementById('comicsInfo');
            comicsInfoContainer.innerHTML = "";

    comics.forEach(comic => {
        comicsInfoContainer.innerHTML += `
            <div class="comicsTransiciones" data-comic-id="${comic.id}">
                <img class="img" src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
            </div>
        `;
    });

    let comics_id = document.getElementsByClassName('comicsTransiciones');

    for (let i = 0; i < comics_id.length; i++) {
        comics_id[i].addEventListener('click', function () {
            let comicId = comics_id[i].getAttribute('data-comic-id');
            obtenerDetallesDelComic(comicId);
        });
    }


        }
    };

    comicsXHR.onerror = function () {
        console.error('Error de red al intentar obtener la información de los cómics.');
    };

    comicsXHR.send();
}

function obtenerDetallesDelComic(comicId) {
    const comicDetallesUrl = `http://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

    let comicDetallesXHR = new XMLHttpRequest();

    comicDetallesXHR.open('GET', comicDetallesUrl, true);

    comicDetallesXHR.onload = function () {
        if (comicDetallesXHR.status >= 200 && comicDetallesXHR.status < 300) {
            let respuestaComicDetalles = JSON.parse(comicDetallesXHR.responseText);
            let comicDetalles = respuestaComicDetalles.data.results[0];

            mostrarPopup(comicDetalles);
        }
    };

    comicDetallesXHR.onerror = function () {
        console.error('Error de red al intentar obtener la información detallada del cómic.');
    };

    comicDetallesXHR.send();
}

function cerrarPopup() {
    let popup = document.getElementById('comicPopup');
    popup.style.display = 'none';
}

function mostrarPopup(comicDetalles) {
    let popup = document.getElementById('comicPopup');
    let contenidoPopup = document.getElementById('contenidoPopup');

    contenidoPopup.innerHTML = `
    <div class="fuente-popup">
        <button class="cerrar-popup" onclick="cerrarPopup()">X</button>
        <h2>${comicDetalles.title}</h2>
        <img class="img3"src="${comicDetalles.thumbnail.path}.${comicDetalles.thumbnail.extension}" alt="${comicDetalles.title}">
        <p>${comicDetalles.description || 'Sin descripción'}</p>
    </div>
    `;

    popup.style.display = 'block';
}

function buscarPersonajes() {
    const inputBuscar = document.getElementById('inputBuscar');
    const buscar = inputBuscar.value;

    const url = `http://gateway.marvel.com/v1/public/characters?${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${buscar}`;

    let buscarXHR = new XMLHttpRequest();

    buscarXHR.open('GET', url, true);

    buscarXHR.onload = function () {
        if (buscarXHR.status >= 200 && buscarXHR.status < 300) {
            let respuestaBusqueda = JSON.parse(buscarXHR.responseText);
            let personajesBusqueda = respuestaBusqueda.data.results;

            let personajeInfoContainer = document.getElementById('personajeInfo');
            personajeInfoContainer.innerHTML = "";

            personajesBusqueda.forEach(personaje => {
                personajeInfoContainer.innerHTML += `
                    <div class="personaje" personaje-id="${personaje.id}">
                        <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                        <h2 class="personajeTexto">${personaje.name}</h2>
                    </div>
                `;
            });

            let personajes_id = document.getElementsByClassName('personaje');

            for (let i = 0; i < personajes_id.length; i++) {
                personajes_id[i].addEventListener('click', function () {
                    let personajeId = personajes_id[i].getAttribute('personaje-id');
                    obtenerComicsDelPersonaje(personajeId);
                });
            }
        }
    };

        buscarXHR.onerror = function () {
            console.error('Error de red al intentar realizar la búsqueda.');
        };

        buscarXHR.send();
    }

    var xhr;

    function inici() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'imatge', true);
        xhr.responseType = 'blob';
    
        xhr.onload = function (e) {
            if (this.status == 200) {
                var blob = this.response;
                var output = document.getElementById('imagenBlob'); 
                var URL = window.URL || window.webkitURL;
                output.src = URL.createObjectURL(blob); 
            }
        };
        xhr.send();
    }
    
    window.addEventListener("load", inici, true);
    

obtenerImagenesAleatorias();
