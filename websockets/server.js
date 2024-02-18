var express = require('express');
var app = express();
app.use(express.static('public'));

const http = require("http");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");

const ts = 1;
const publickey = "dd2ca7aa45a3d7a09763bb0e98d24f39";
const hash = "cb78c8fab02c168b9097e47bbe10cbf5";
const limit = "limit=7";
const randomOffset = `offset=${Math.round(Math.random() * 1473)}`;

function iniciar() {
    const server = http.createServer(onRequest).listen(8888);
    console.log("Server iniciado http://localhost:8888/index.html");

    const io = socketIo(server);

    io.on("connection", (socket) => {
        console.log("Nueva conexión Socket.IO.");

        socket.on("message", (message) => {
            console.log("hola", message);
        });
        const url = `http://gateway.marvel.com/v1/public/characters?${limit}&${randomOffset}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
        socket.on("idPersonaje", (data) => {
            let id = data.personaje1;
            const url1 = `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}`;
            fetch(url1).then((response) => response.json()).then(data => socket.emit("ObtenerComicsPerosnajes", data));
        })

        socket.on("comicid", (data) => {
            let comic = data.comic1;
            const url2 = `http://gateway.marvel.com/v1/public/comics/${comic}?ts=${ts}&apikey=${publickey}&hash=${hash}`;
            fetch(url2).then((response) => response.json()).then(data => socket.emit("DetallesComic", data));
        })

        socket.on("buscar", (data) => {
            let buscar = data.buscar1;
            const url3 = `http://gateway.marvel.com/v1/public/characters?${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${buscar}`;
            fetch(url3).then((response) => response.json()).then(data => socket.emit("BuscarPersonaje", data));
        })

        socket.on("buscar", (data) => {
            let buscar = data.nombre2;
            const url3 = `http://gateway.marvel.com/v1/public/characters?${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${buscar}`;
            fetch(url3).then((response) => response.json()).then(data => socket.emit("RespuestaImagenesAleatorias", data));
        })

        fetch(url).then(response => response.json()).then(data => socket.emit("RespuestaImagenesAleatorias", data));
    });
    

    function onRequest(req, res) {
        const baseURL = req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new URL(req.url, baseURL);
        const ruta = reqUrl.pathname;

        app(req, res, () => { });

    }
}

iniciar();
