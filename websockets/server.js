var express = require('express');
var app = express();
app.use(express.static('public'));

const http = require("http");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");

function iniciar() {
    const server = http.createServer(onRequest).listen(8888);
    console.log("Servidor HTTP iniciado en http://localhost:8888/index.html");

    const io = socketIo(server);

    io.on("connection", (socket) => {
        console.log("Nueva conexión Socket.IO.");

        socket.on("message", (message) => {
            console.log("hola", message);
        });
    });

    function onRequest(req, res) {
        const baseURL = req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new URL(req.url, baseURL);
        const ruta = reqUrl.pathname;

        app(req, res, () => {});

    }
}

iniciar();
