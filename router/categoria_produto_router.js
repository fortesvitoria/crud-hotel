const express = require("express");
const routerCategorias = express.Router();

routerCategorias.get('/categorias', (req, res) => res.sendStatus(404));
routerCategorias.post('/categorias', (req, res) => res.sendStatus(404));
routerCategorias.get('/categorias/:id', (req, res) => res.sendStatus(404));
routerCategorias.put('/categorias/:id', (req, res) => res.sendStatus(404));
routerCategorias.delete('/categorias/:id', (req, res) => res.sendStatus(404));

module.exports = routerCategorias;  