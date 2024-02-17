const express = require('express');
const app = express();
const http = require("http");
const fs = require("fs");

app.use(express.static('public'));

function iniciar() {
    const server = http.createServer(onRequest).listen(8888);
    console.log("Server iniciado http://localhost:8888/index.html");

    function onRequest(req, res) {
        const baseURL = req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new URL(req.url, baseURL);
        const ruta = reqUrl.pathname;

        app(req, res, () => {});

        if (ruta == '/imatge') {
            fs.readFile('./public/img/Marvel_Logo.svg.png', function(err, sortida) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("404 Not Found");
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(sortida);
                    res.end();
                }
            });
        }
    }
}
iniciar();
