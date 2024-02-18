const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=7";
const randomOffset = `offset=${Math.round(Math.random() * 1473)}`;
const deadpoolID = 1009268;
const wolverineID = 1009718;

const socket = io();
socket.on("RespuestaImagenesAleatorias", (data)=> {
    let personajes = data.data;
    let personajeInfoContainer = document.getElementById("personajeInfo");
    console.log(personajes)
    personajes.results.forEach(personaje => {
        personajeInfoContainer.innerHTML += `
            <div class="personaje" personaje-id="${personaje.id}">
                <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                <h2 class="personajeTexto">${personaje.name}</h2>
            </div>
        `;
    });
    const personajes_id = document.getElementsByClassName('personaje');
    
    for (let i = 0; i < personajes_id.length; i++) {
        personajes_id[i].addEventListener('click', function () {
            const personajeId = personajes_id[i].getAttribute('personaje-id');
            socket.emit("idPersonaje", {personaje1: personajeId});
        });
    }
})


socket.on("ObtenerComicsPerosnajes", (data) =>{

    const comicsInfoContainer = document.getElementById('comicsInfo');
    comicsInfoContainer.innerHTML = "";

    data.data.results.forEach(comic => {
        comicsInfoContainer.innerHTML += `
            <div class="comicsTransiciones" data-comic-id="${comic.id}">
                <img class="img" src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
            </div>
        `;
    });

    const comics_id = document.getElementsByClassName('comicsTransiciones');

    for (let i = 0; i < comics_id.length; i++) {
        comics_id[i].addEventListener('click', function () {
            const comicId = comics_id[i].getAttribute('data-comic-id');

            socket.emit("comicid", {comic1: comicId});
        });
    }
});

socket.on("DetallesComic", (data) =>{
    const comicDetalles = data.data.results[0];
    mostrarPopup(comicDetalles);
});

socket.on("BuscarPersonaje", (data) => {
    const personajesBusqueda = data.data.results;
    const personajeInfoContainer = document.getElementById('personajeInfo');
    personajeInfoContainer.innerHTML = "";

    personajesBusqueda.forEach((personaje) => {
        personajeInfoContainer.innerHTML += `
            <div class="personaje" personaje-id="${personaje.id}">
                <img class="img2" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}">
                <h2 class="personajeTexto">${personaje.name}</h2>
            </div>
        `;
    });

    const personajes_id = document.getElementsByClassName('personaje');

    for (let i = 0; i < personajes_id.length; i++) {
        personajes_id[i].addEventListener('click', function () {
            const personajeId = personajes_id[i].getAttribute('personaje-id');
            socket.emit("idPersonaje", {personaje1: personajeId});
        });
    }
});

window.onload = () => {
    let botonBuscar = document.getElementById("boton");

    botonBuscar.addEventListener('click', () => {
        let inputBuscar = document.getElementById('inputBuscar');
        let buscar = inputBuscar.value;
        socket.emit("buscar", { buscar1: buscar });
    });
};



function cerrarPopup() {
    const popup = document.getElementById('comicPopup');
    popup.style.display = 'none';
}

function mostrarPopup(comicDetalles) {
    const popup = document.getElementById('comicPopup');
    const contenidoPopup = document.getElementById('contenidoPopup');

    contenidoPopup.innerHTML = `
        <div class="fuente-popup">
            <button class="cerrar-popup" onclick="cerrarPopup()">X</button>
            <h2>${comicDetalles.title}</h2>
            <img class="img3" src="${comicDetalles.thumbnail.path}.${comicDetalles.thumbnail.extension}" alt="${comicDetalles.title}">
            <p>${comicDetalles.description || 'Sin descripción'}</p>
        </div>
    `;

    popup.style.display = 'block';
}



